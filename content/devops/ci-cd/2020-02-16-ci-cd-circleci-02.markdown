---
type   : post
title  : "CI/CD - CircleCI - Part Two"
date   : 2020-02-16T13:13:35+07:00
slug   : ci-cd-circleci-02
categories: [devops]
tags      : [git, ssg, deploy]
keywords  : [static site, circleci]
author : epsi
opengraph:
  image: assets/site/images/topics/git.png

toc    : "toc-2020-02-ci-cd-ssg"

excerpt:
  CI/CD for SSG in github using CircleCI.
  This deployment method is using Jekyll, Pelican and Hugo as SSG test bed.
---

### Preface

> Goal: Deploy SSG in github using CircleCI.

We are going to utilize `git worktree` to reduce build time.
We can see how useful `git worktree` in this CircleCI situation.

#### Table of Content

* Preface: Table of Content

* 5: Problem Definition

* 6: Branch Issue

* 7: Run: Manage Bash Command in YAML

* 8: Deploy: Using Worktree

* 9: Summary: Pelican, Jekyll, Hugo

* What is Next ?

-- -- --

### 5: Problem Definition

Once, I was looking for a way to do CircleCI.
And this article below got me a good attention.
Although, I can't get to work, the `git worktree` command got me curious.

* [Automating hugo builds using CircleCI][willschenk]

Then I found another article, that is too complex.
I do not use `Amazon S3` either.

* [Automate Your Static Site Deployment with CircleCI][forestry-deploy]

And I finally find good snippet by megrxu.
This guy is smart. And I finally build my SSG using CircleCI.
I should be thankful.

* [gist.github.com/megrxu][megrxu-gist]

The only issue is build time.
After examining the code.
I found that this configuration utilize two docker images.
The first docker image for building the site,
and the second docker image only to run `gh-pages`.

{{< highlight yaml >}}
version: 2

workflows:
  version: 2
  build:
    jobs:
      - build
      - deploy:
          ...

jobs:
  build:
    docker:
      - image: cibuilds/hugo:latest
    ...
  deploy:
    docker:
      - image: node:8.10.0
    ...
      - run:
          name: Deploy docs to gh-pages branch
          command: gh-pages --dotfiles --message "[skip ci] Updates" --dist public
{{< / highlight >}}

I was triggered to replace this nodejs `gh-pages` application with pure `git` command.
And I found this also good article below. The only issue is it has external script.

* [Deploying Jekyll to GitHub Pages with CircleCI 2.0][jtway-co-jekyll]

After a long thinking, I goes back to the first artikel from **Will Schenk**.
Using `git worktree`.Lucky me, I have learnt `worktree` a month before.
That you can read my long article here:

* [CI/CD - Manual Git Worktree][local-worktree]

Now the next challenge.
How do I apply worktree in CircleCI.
And of course, get it to work, until my site, live.

-- -- --

### 6: Branch Issue

Before we doing this cool `git worktree` feature,
we have to face a fundamental issue.

#### gh-pages Existence

Before we rewrite this `origin/gh-pages` in every build,
we need to create `origin/gh-pages` for the first time.
And also not making it over and over again.
This means we have to push something using `gh-pages` branch in our first build.

Do you get, the issue we face here 🤔?
Or should I just keep on writing this blog?

#### Bash Approach

After a few trial and error,
I finally manage to check if the branch exist.

{{< highlight bash >}}
$ git branch -a -l
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/gh-pages
  remotes/origin/master
{{< / highlight >}}

The complete oneliner command is as below:

{{< highlight bash >}}
$ git branch -a -l | grep gh-pages | wc -l
{{< / highlight >}}

You can try yourself in your comfortable PC, or notebook.
This command below will result `1`.

{{< highlight bash >}}
$ git branch -a -l | grep master | wc -l
{{< / highlight >}}

Now here the complete bash script.
that we are going to use in CI/CD.

{{< highlight bash >}}
if [ $(git branch -a -l | grep gh-pages | wc -l) -eq "0" ]; then
  echo "[Create gh-pages for the first time]"
  git checkout -b gh-pages
  git commit --allow-empty -m "Create gh-pages for the first time"
  git push --set-upstream origin gh-pages
  git checkout master
fi
{{< / highlight >}}

![CircleCI: Bash Check Branch][image-ss-circleci-10]

-- -- --

### 7: Run: Manage Bash Command in YAML

The next step is to puth the order of bash script,
into `./circleci/config.yml`.

We are going to use Pelican SSG as an example.
And we will have both Jekyll example and Hugo example,
as complementary config.

#### The Skeleton

Let me remind you about the skeleton.
So that we can undertand the bigger structure.

{{< highlight yaml >}}
      - run:
          name: Prepare Git Initialization
          ...
      - run: 
          name: Install and Configure Dependencies
          ...
      - run: 
          name: Generate Pelican Static Files
          ...
      - deploy:
          name: Precheck Output 
          ...
      - deploy:
          name: Deploy Release to GitHub
          ...
{{< / highlight >}}

![CircleCI: Pelican Build Skeleton][image-ss-circleci-11]

We are going to put the script in each section.
The same script, but in YAML format.

#### Prepare Git Initialization

Consider rewrite, the line commands above,
in a YAML fashioned.

{{< highlight yaml >}}
- run:
    name: Prepare Git Initialization
    command: |
      git config user.email "someone@somewhere"
      git config user.name "someone"
      git branch -a -l | cat
      if [ $(git branch -a -l | grep gh-pages | wc -l) -eq "0" ]; then
        echo "[Create gh-pages for the first time]"
        git checkout -b gh-pages
        git commit --allow-empty -m "Create gh-pages for the first time"
        git push --set-upstream origin gh-pages
        git checkout master
      fi
{{< / highlight >}}

This script part is the same for Jekyll, Hugo or Pelican.

#### Install and Configure Dependencies

Here, wince Pelican is Python based.
We are going to install Pelican using PIP.

{{< highlight yaml >}}
- run: 
    name: Install and Configure Dependencies
     command: |
       python3 -m venv venv
      . venv/bin/activate
      pip install --user --upgrade pip
      pip install -r requirements.txt
 {{< / highlight >}}

Which the `requirement.txt` in my case is:

{{< highlight configuration >}}
Jinja2   ~= 2.10.1
pelican  ~= 4.2.0
Markdown ~= 3.1.1
{{< / highlight >}}

This part does not have anything to do with `git`.
And this part is different for each SSG (Jekyll, hugo, Pelican)

#### Generate Pelican Static Files

This section is about SSG.
And it is also doesn't have anything to do with `git`.

{{< highlight yaml >}}
- run: 
    name: Generate Pelican Static Files
    command: |
      . venv/bin/activate
      make html
{{< / highlight >}}

The next steps would be similar for each SSG (Jekyll, Hugo, Pelican)./
Only pure `git`.

-- -- --

### 8: Deploy: Using Worktree

Now we still have these section left.

{{< highlight yaml >}}
      - deploy:
          name: Precheck Output 
          ...
      - deploy:
          name: Deploy Release to GitHub
          ...
{{< / highlight >}}

Be aware that this is the most complex part in this article.
You might need to read twice.

#### Precheck Output

Actually, there are two purpose here.

1. 🕷 Working with worktree itself.

2. 🕷 Debugging process.
   Since this is a complex parts.
   I need to be sure, that it works as I want.
   Especially for first time build.

{{< highlight yaml >}}
- deploy:
    name: Precheck Output 
    command: |
      git worktree add -B gh-pages $BUILD_DIR origin/gh-pages
      git worktree list
      cd $BUILD_DIR
      ls -lah
      find . -maxdepth 1 ! -name '.git' -exec rm -rf {} \;
      mv ~/source/output/* .
      touch .nojekyll
      ls -lah
{{< / highlight >}}

First of all, we use `worktree`,
to a directory that we have prepared before.
For example:

* Source Directory: `~/Source` (master branch)

* Build Directory: `~/Public` (gh-pages branch)

The next step is to purge all the build directory in `~/Public`,
except `.git` if exist.
So that we have a clean directory to start over.

Then we need to copy build files,
depend on SSG the name could vary, for example from `~/Source/output`, or `~/Source/_site`,
or `~/Source/dist`, or `~/Source/Public`.
We need to copy build files to `$BUILD_DIR`,
that we define in `config.yml`.

That is all.

#### Environment Variable

We can either set here

{{< highlight yaml >}}
jobs:
  buildsite:
    docker:
      - image: circleci/python:3.7.1
    working_directory: ~/source
    environment:
      BUILD_DIR: ~/public
{{< / highlight >}}

Or in dashboard, for example a `Hugo` environment variable below:

![CircleCI: Setting Hugo Environment Variable][image-ss-circleci-12]

#### Deploy Release to GitHub

Finally the last section.

{{< highlight yaml >}}
- deploy:
    name: Deploy Release to GitHub
     command: |
      cd $BUILD_DIR
      git add --all
      git status
      git commit --allow-empty -m "[skip ci] $(git log master -1 --pretty=%B)"
      git push --set-upstream origin gh-pages
      echo "[Deployed Successfully]"
{{< / highlight >}}

Again we switch directory to `$BUILD_DIR`.
Then as usual: `commit` and `push`.
But be aware of these two additional `git commit` tips.

1. Use `--allow-empty`.
   If yo don't, the `commit` command will return `exit code` as `1`,
   that leads to `build failed`.

2. Add `[skip-ci]` in `commit message`.
   So that `push event` from github does not trigger `CircleCI` to process `build`.
   That leads to unecessary multiple `build` process.

#### Preview

If everything is fine,
the Pelican site will be served in `github pages` soon.

![CircleCI: Pelican Live Site Preview][image-ss-circleci-13]

-- -- --

### Summary: Pelican, Jekyll, Hugo

As a summary, here is the complete configuration for each SSG.
Notice that we already show,
both `Eleventy` and `Hexo` configuration in previous article.

#### 3: Pelican

* [Pelican: .circleci/config.yml][circleci-yaml-pelican]

{{< highlight yaml >}}
version: 2

workflows:
  version: 2
  build:
    jobs:
      - buildsite:
         filters:
            branches:
              only: master

jobs:
  buildsite:
    docker:
      - image: circleci/python:3.7.1
    working_directory: ~/source
    environment:
      BUILD_DIR: ~/public
    steps:
      - checkout
      - add_ssh_keys:
          fingerprints:
            - "b8:0d:46:75:5d:be:c4:2b:bd:fc:74:8d:d7:0c:4b:c1"
      - run:
          name: Prepare Git Initialization
          command: |
            git config user.email "someone@somewhere"
            git config user.name "someone"
            git branch -a -l | cat
            if [ $(git branch -a -l | grep gh-pages | wc -l) -eq "0" ]; then
              echo "[Create gh-pages for the first time]"
              git checkout -b gh-pages
              git commit --allow-empty -m "Create gh-pages for the first time"
              git push --set-upstream origin gh-pages
              git checkout master
            fi
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
            git worktree add -B gh-pages $BUILD_DIR origin/gh-pages
            git worktree list
            cd $BUILD_DIR
            ls -lah
            find . -maxdepth 1 ! -name '.git' -exec rm -rf {} \;
            mv ~/source/output/* .
            touch .nojekyll
            ls -lah
      - deploy:
          name: Deploy Release to GitHub
          command: |
            cd $BUILD_DIR
            git add --all
            git status
            git commit --allow-empty -m "[skip ci] $(git log master -1 --pretty=%B)"
            git push --set-upstream origin gh-pages
            echo "[Deployed Successfully]"
{{< / highlight >}}

The Pelican build time looks good.

![CircleCI: Pelican Build Time][image-ss-circleci-21]

#### 4: Jekyll

* [Jekyll: .circleci/config.yml][circleci-yaml-jekyll]

{{< highlight yaml >}}
version: 2

workflows:
  version: 2
  build:
    jobs:
      - buildsite:
         filters:
            branches:
              only: master

jobs:
  buildsite:
    docker:
      # Choose Image that Support Git Worktree Command
      - image: circleci/ruby:2.4
    working_directory: ~/source
    environment:
      BUILD_DIR: ~/public
    steps:
      - checkout
      - add_ssh_keys:
          fingerprints:
            - "dc:18:73:7a:1a:a7:5f:92:31:67:cb:20:eb:0f:77:31"
      - run:
          name: Prepare Git Initialization
          command: |
            git config user.email "someone@somewhere"
            git config user.name "someone"
            git branch -a -l | cat
            if [ $(git branch -a -l | grep gh-pages | wc -l) -eq "0" ]; then
              echo "[Create gh-pages for the first time]"
              git checkout -b gh-pages
              git commit --allow-empty -m "Create gh-pages for the first time"
              git push --set-upstream origin gh-pages
              git checkout master
            fi
      - run: bundle install
      - run: bundle exec jekyll build
      - deploy:
          name: Precheck Output 
          command: |
            git worktree add -B gh-pages $BUILD_DIR origin/gh-pages
            git worktree list
            cd $BUILD_DIR
            ls -lah
            find . -maxdepth 1 ! -name '.git' -exec rm -rf {} \;
            mv ~/source/_site/* .
            touch .nojekyll
            ls -lah
      - deploy:
          name: Deploy Release to GitHub
          command: |
            cd $BUILD_DIR
            git add --all
            git status
            git commit --allow-empty -m "[skip ci] $(git log master -1 --pretty=%B)"
            git push --set-upstream origin gh-pages
            echo "[Deployed Successfully]"
{{< / highlight >}}

The Jekyll Section shown here.

![CircleCI: Jekyll Steps Skeleton][image-ss-circleci-22]

#### 5: Hugo

* [Hugo: .circleci/config.yml][circleci-yaml-hugo]

{{< highlight yaml >}}
version: 2

workflows:
  version: 2
  build:
    jobs:
      - buildsite:
         filters:
            branches:
              only: master

jobs:
  buildsite:
    docker:
      - image: cibuilds/hugo:latest
    working_directory: ~/source
    environment:
      BUILD_DIR: ~/public
    steps:
      - checkout
      - add_ssh_keys:
          fingerprints:
            - "af:ff:21:08:af:e3:94:5d:ae:be:9a:d2:00:e4:9d:5e"
      - run:
          name: Prepare Git Initialization
          command: |
            git config user.email "someone@somewhere"
            git config user.name "someone"
            git branch -a -l | cat
            if [ $(git branch -a -l | grep gh-pages | wc -l) -eq "0" ]; then
              echo "[Create gh-pages for the first time]"
              git checkout -b gh-pages
              git commit --allow-empty -m "Create gh-pages for the first time"
              git push --set-upstream origin gh-pages
              git checkout master
            fi
      - run: HUGO_ENV=production hugo
      - deploy:
          name: Precheck Output
          command: |
            git worktree add -B gh-pages $BUILD_DIR origin/gh-pages
            git worktree list
            cd $BUILD_DIR
            ls -lah
            find . -maxdepth 1 ! -name '.git' -exec rm -rf {} \;
            mv ~/source/public/* .
            touch .nojekyll
            ls -lah
      - deploy:
          name: Deploy Release to GitHub
          command: |
            cd $BUILD_DIR
            git add --all
            git status
            git commit --allow-empty -m "[ci skip] $(git log master -1 --pretty=%B)"
            git push --set-upstream origin gh-pages
            echo "[Deployed Successfully]"
{{< / highlight >}}

#### Hugo Comparation

Here is the comparation.

1. Hugo Build Time with Node Image
   ![CircleCI: Hugo Build Time with Node Image][image-ss-circleci-23]

2. Hugo Build Time with only One Image
   ![CircleCI: Hugo Build Time with only One Image][image-ss-circleci-24]

-- -- --

### What is Next ?

We are done with Github. How about Bitbucket ?
Consider continue reading [ [CI/CD - CircleCI - Part Three][local-whats-next] ].

[//]: <> ( -- -- -- links below -- -- -- )

[local-whats-next]:     {{< baseurl >}}/devops/2020/02/17/ci-cd-circleci-03/
[local-worktree]:       {{< baseurl >}}/devops/2020/02/14/ci-cd-git-worktree-01/

[willschenk]:           https://willschenk.com/articles/2018/automating_hugo_with_circleci/
[forestry-deploy]:      https://forestry.io/blog/automate-deploy-w-circle-ci/
[megrxu-gist]:          https://gist.github.com/megrxu/94e825d74ae0ddb5f8eab9da3422258b
[jtway-co-jekyll]:      https://jtway.co/deploying-jekyll-to-github-pages-with-circleci-2-0-3eb69324bc6e

[circleci-yaml-jekyll]:     https://github.com/epsi-rns/circleci-jekyll/blob/master/.circleci/config.yml
[circleci-yaml-hugo]:       https://github.com/epsi-rns/circleci-hugo/blob/master/.circleci/config.yml
[circleci-yaml-pelican]:    https://github.com/epsi-rns/circleci-pelican/blob/master/.circleci/config.yml

[image-ss-circleci-10]: {{< baseurl >}}assets/posts/devops/2020/02/circleci/06-circleci-10-check-gh-pages.png
[image-ss-circleci-11]: {{< baseurl >}}assets/posts/devops/2020/02/circleci/06-circleci-11-pelican-jobs.png
[image-ss-circleci-12]: {{< baseurl >}}assets/posts/devops/2020/02/circleci/06-circleci-12-environment.png
[image-ss-circleci-13]: {{< baseurl >}}assets/posts/devops/2020/02/circleci/06-circleci-13-pelican-preview.png

[image-ss-circleci-21]: {{< baseurl >}}assets/posts/devops/2020/02/circleci/06-circleci-21-pelican-build-time.png
[image-ss-circleci-22]: {{< baseurl >}}assets/posts/devops/2020/02/circleci/06-circleci-22-jekyll-worktree.png
[image-ss-circleci-23]: {{< baseurl >}}assets/posts/devops/2020/02/circleci/06-circleci-23-hugo-node-build-time.png
[image-ss-circleci-24]: {{< baseurl >}}assets/posts/devops/2020/02/circleci/06-circleci-24-hugo-one-image-build-time.png

