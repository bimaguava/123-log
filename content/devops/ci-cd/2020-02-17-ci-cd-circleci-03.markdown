---
type   : post
title  : "CI/CD - CircleCI - Part Three"
date   : 2020-02-17T09:17:35+07:00
slug   : ci-cd-circleci-03
categories: [devops]
tags      : [git, ssg, deploy]
keywords  : [static site, circleci]
author : epsi
opengraph:
  image: assets/site/images/topics/git.png

toc    : "toc-2020-02-ci-cd-ssg"

excerpt:
  CI/CD for SSG in bitbucket using CircleCI.
  This deployment method is using Pelican as SSG test bed.
---

### Preface

> Goal: Deploy SSG in bitbucket using CircleCI.

For you that feels like gitlab.io and github.io is not enough,
you may consider bitbucket.io.

With CircleCI, you have more build time,
than the default bitbucket's pipeline.

#### Table of Content

* Preface: Table of Content

* 10: Problem Definition: The SSH Issue

* 11: Prepare Your Repository

* 12: Configuration

* 13: Prevent Push

* Conclusion

* What is Next ?

-- -- --

### 10: Problem Definition: The SSH Issue

Unlike github, I never get any luck,
in using __SSH fingerprints__ with buckbet.

![CircleCI+Bitbucket: Fingerprint Issue][image-ss-bitbucket-00]

My solution is to use my own SSH as environment variable in CircleCI.

I have to setup in three places

* Local PC: Create my own SSH

* Bitbucket

* CirleCI Environment Variables.

#### Generate RSA Key

In my local PC

{{< highlight bash >}}
$ ssh-keygen -o -t rsa -b 4096 -C "epsi.nurwijayadi@gmail.com"
{{< / highlight >}}

Now I can see my public RSA key.

![CircleCI+Bitbucket: id_rsa.pub][image-ss-bitbucket-01]

#### Setting Up SSH in Bitbucket.

There are two places to setup SSH in Bitbucket.
Global setting, and each repository.
The global setting need only public RSA key,
while for repository require pair, both private and public.
For this example, I use global setting.

Copy then paste, the public RSA key.

![CircleCI+Bitbucket: Setup SSH in Bitbucket][image-ss-bitbucket-02]

You can use any name.

#### Testing SSH

You may use this command to test whether it works or not.

{{< highlight bash >}}
$ ssh-keyscan bitbucket.org
{{< / highlight >}}

![CircleCI+Bitbucket: ssh-keyscan bitbucket.org][image-ss-bitbucket-03]

#### CircleCI Environment Variable

Again, copy then paste, the public RSA key.

![CircleCI+Bitbucket: CircleCI Environment Variable][image-ss-bitbucket-04]

Name the variable, for this example `DEPLOY_KEY`.

#### YAML Configuration

We will use this variable later

{{< highlight yaml >}}
      - run: 
          name: Prepare Deploy Key
          command: |
           echo "${DEPLOY_KEY}" > ~/.ssh/id_rsa
           chmod 600 ~/.ssh/id_rsa
           ssh-keyscan bitbucket.org >> ~/.ssh/known_hosts
{{< / highlight >}}

I know, it looks strange that it does not write to `~/.ssh/id_rsa.pub`.

-- -- --

### 11: Prepare Your Repository

This time we are going to define new model for our repository.

1. branch develop: source code
2. branch master: generated site

#### Push Both

For each branch, you have to `git push`, one by one.

{{< highlight bash >}}
$ git push -u origin master
{{< / highlight >}}

then later

{{< highlight bash >}}
$ git push -u origin develop
{{< / highlight >}}

If you `git push` for `master` branch only.
The `develop` branch would be left behind, unpushed.

Now it is a good time to practice.

#### Create Master Branch

{{< highlight bash >}}
$ git checkout -b master
Switched to a new branch 'master'

$ echo "Test Master Branch" > MASTER.md
$ git add MASTER.md
$ ls
MASTER.md

$ git commit -m "Master: First Commit"
 create mode 100644 MASTER.md

$ git branch | cat
* master
{{< / highlight >}}

#### Create Develop Branch

{{< highlight bash >}}
$ git checkout -b develop
$ ls
README.md
$ rm MASTER.md

$ echo "Test Develop Branch" > DEVELOP.md
$ git add DEVELOP.md
$ ls
DEVELOP.md
$ git commit -m "Develop: Second Commit"
 create mode 100644 DEVELOP.md

$ git branch | cat
* develop
  master
{{< / highlight >}}

![Bitbucket: Prepare Both Branches in Bitbucket][image-ss-bitbucket-11]

#### Push Both

As a reminder, do not forget to push both.

{{< highlight bash >}}
$ git push -u origin master
$ git push -u origin develop
{{< / highlight >}}

![Bitbucket: Push Both Branches in Bitbucket][image-ss-bitbucket-12]

#### Branches in Repository

In your bitbucket repository, your branches would looks similar to this:

![Bitbucket: Branches in Bitbucket Repository][image-ss-bitbucket-13]

You can check with your terminal

{{< highlight bash >}}
$ git branch -a -l | cat
* develop
  master
  remotes/origin/develop
  remotes/origin/master
{{< / highlight >}}

![Bitbucket: Branches in Terminal][image-ss-bitbucket-14]

Notice that in local repository, and remote, might have different content.

#### SSG

The next step is to set-up SSG.
You can use previous article to setup SSG.

-- -- --

### 12: Configuration

I provide two CircleCI configuration.
Both Works with Bitbucket.

The header is the same for both:

{{< highlight yaml >}}
version: 2

workflows:
  version: 2
  build:
    jobs:
      - buildsite:
         filters:
            branches:
              only: develop
{{< / highlight >}}

But the jobs have different commands.

#### Using Refspec

{{< highlight yaml >}}
jobs:
  buildsite:
    docker:
      - image: circleci/python:3.7.1
    working_directory: ~/source
    steps:
      - checkout
      - run: 
          name: Prepare Deploy Key
          command: |
           echo "${DEPLOY_KEY}" > ~/.ssh/id_rsa
           chmod 600 ~/.ssh/id_rsa
           ssh-keyscan bitbucket.org >> ~/.ssh/known_hosts
      - run:
          name: Prepare Git Initialization
          command: |
            git config user.email "someone@somewhere"
            git config user.name "someone"
      - run: 
          name: Install and Configure Dependencies
          command: |
            python3 -m venv venv
            . venv/bin/activate
            pip install --user --upgrade pip
            pip install -r requirements.txt
      - run: 
          name: Generate Pelican Static Files
          command: |
            . venv/bin/activate
            make html
      - deploy:
          name: Precheck Output 
          command: |
            mkdir ~/public
            cd ~/public
            mv ~/source/output/* .
            ls -lah
      - deploy:
          name: Deploy Release to GitHub
          command: |
            cd ~/public
            git init
            git config user.email "someone@somewhere"
            git config user.name "someone"
            git remote add origin git@bitbucket.org:epsi/epsi.bitbucket.io.git
            git add --all
            git status
            git commit --allow-empty -m "[skip ci] Update at $(date)"
            git push origin master:refs/heads/master --force
            echo "[Deployed Successfully]"
{{< / highlight >}}

#### Using Worktree

{{< highlight yaml >}}
jobs:
  buildsite:
    docker:
      - image: circleci/python:3.7.1
    working_directory: ~/source
    environment:
      BUILD_DIR: ~/public
    steps:
      - checkout
      - run: 
          name: Prepare Deploy Key
          command: |
           echo "${DEPLOY_KEY}" > ~/.ssh/id_rsa
           chmod 600 ~/.ssh/id_rsa
           ssh-keyscan bitbucket.org >> ~/.ssh/known_hosts
      - run:
          name: Prepare Git Initialization
          command: |
            git config user.email "someone@somewhere"
            git config user.name "someone"
      - run: 
          name: Install and Configure Dependencies
          command: |
            python3 -m venv venv
            . venv/bin/activate
            pip install --user --upgrade pip
            pip install -r requirements.txt
      - run: 
          name: Generate Pelican Static Files
          command: |
            . venv/bin/activate
            make html
      - deploy:
          name: Precheck Output 
          command: |
            git worktree add -B master $BUILD_DIR origin/master
            git worktree list
            cd $BUILD_DIR
            ls -lah
            find . -maxdepth 1 ! -name '.git' -exec rm -rf {} \;
            mv ~/source/output/* .
            ls -lah
      - deploy:
          name: Deploy Release to GitHub
          command: |
            cd $BUILD_DIR
            git add --all
            git status
            git commit --allow-empty -m "[skip ci] $(git log develop -1 --pretty=%B)"
            git push --set-upstream origin master
            echo "[Deployed Successfully]"
{{< / highlight >}}

#### Live Site Preview

The bitbucket will render the site based on the `master` branch.

![Bitbucket: Live Site Preview][image-ss-bitbucket-21]

* <https://epsi.bitbucket.io/>

Also notice, that since the source code relies on the `develop` branch,
we always push to `develop` branch instead of `master`.

{{< highlight bash >}}
$ git push -u origin develop
{{< / highlight >}}

#### Real Live Example

In repo perspective: Backend ➕ DevOps 🔜 Frontend.

1. Source Backend: SSG (Pelican):<br/>
   🕷 https://bitbucket.org/epsi/epsi.bitbucket.io/src/develop/

2. Source Frontend: Site (HTML+CSS+Assets):<br/>
   🕷 https://bitbucket.org/epsi/epsi.bitbucket.io/src/master/

3. Source Devops: CircleCI (Workflows+Jobs):<br/>
   🕷 https://bitbucket.org/epsi/epsi.bitbucket.io/src/develop/.circleci/config.yml


-- -- --

### 13: Prevent Push: To 

You should always push, only to `develop` branch.

{{< highlight bash >}}
❯ git push -u origin develop
{{< / highlight >}}

Using `develop` branch can be error prone,
if your muscle memory tend to push to `master` branch.

If you mistakenly push to remote `master` branch
while in local `develop` branch.
the `push` will be rejected,
because your `HEAD` is behind.

But you are going to be in trouble,
if you are already in `master` branch,
checking out on something,
and accidentaly push to remote `master` branch.

You can prevent pushing to master by using `.git/hooks/pre-push`.

{{< highlight bash >}}
#!/bin/sh

current=$(git rev-parse --abbrev-ref HEAD)

if [ "$current" = "master" ]; then
  echo "Thou should not push to master!"
  exit 1
fi

exit 0
{{< / highlight >}}

Now evertyime you mistakenly push from `master` branch:

{{< highlight bash >}}
❯ git push -u origin master
Thou should not push to master!
error: failed to push some refs to 'git@bitbucket.org:epsi/epsi.bitbucket.io.git'
{{< / highlight >}}

Your `master` branch is safe now.

-- -- --

### Conclusion: Branch Name

Hypotethically, this method can be utilized in any CI/CD,
not just CircleCI, because it is just pure git command line.
This means that we can use any repository other than github
without `gh-pages` branch. Or still using github,
but with different branch strategy, for example:

* branch develop: source code
* branch master: generated site

After all, the limit is your creativity.

-- -- --

### What is Next ?

We are done with Bitbucket. How about going back to Github?
Consider continue reading [ [CI/CD - Github Workflows][local-whats-next] ].
This time we are going to explore Github Actions.

[//]: <> ( -- -- -- links below -- -- -- )

[local-whats-next]:     {{< baseurl >}}/devops/2020/02/18/ci-cd-github-workflows/

[image-ss-bitbucket-00]:    {{< baseurl >}}assets/posts/devops/2020/02/bitbucket/07-bitbucket-00-circleci-fingerprint-issue.png
[image-ss-bitbucket-01]:    {{< baseurl >}}assets/posts/devops/2020/02/bitbucket/07-bitbucket-01-id-rsa-pub.png
[image-ss-bitbucket-02]:    {{< baseurl >}}assets/posts/devops/2020/02/bitbucket/07-bitbucket-02-bitbucket-setup-ssh.png
[image-ss-bitbucket-03]:    {{< baseurl >}}assets/posts/devops/2020/02/bitbucket/07-bitbucket-03-ssh-keyscan.png
[image-ss-bitbucket-04]:    {{< baseurl >}}assets/posts/devops/2020/02/bitbucket/07-bitbucket-04-circleci-environment-variable.png


[image-ss-bitbucket-11]:    {{< baseurl >}}assets/posts/devops/2020/02/bitbucket/07-bitbucket-11-master.png
[image-ss-bitbucket-12]:    {{< baseurl >}}assets/posts/devops/2020/02/bitbucket/07-bitbucket-12-develop.png
[image-ss-bitbucket-13]:    {{< baseurl >}}assets/posts/devops/2020/02/bitbucket/07-bitbucket-13-branches.png
[image-ss-bitbucket-14]:    {{< baseurl >}}assets/posts/devops/2020/02/bitbucket/07-bitbucket-14-branch-al.png

[image-ss-bitbucket-21]:    {{< baseurl >}}assets/posts/devops/2020/02/bitbucket/07-bitbucket-21-live-site-preview.png
