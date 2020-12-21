---
type   : post
title  : "CI/CD - Git Worktree - Part Two"
date   : 2020-02-14T13:13:35+07:00
slug   : ci-cd-git-worktree-02
categories: [devops]
tags      : [git, ssg, deploy]
keywords  : [static site, worktree]
author : epsi
opengraph:
  image: assets/site/images/topics/git.png

toc    : "toc-2020-02-ci-cd-ssg"

excerpt:
  Deploy SSG manually without CI/CD, utilizing git worktree feature
  This part applied deployment method for Pelican as SSG test bed.
---

### Preface

> Goal: Deploy SSG manually without CI/CD, utilizing git worktree feature.

After finishing steps in previous article.
Now it is time to push to either bitbucket or gitlab or github.
We are going to use different `remote` in one repository.
Just one repository.

![git worktree: All Remote in Repository][image-ss-worktree-06]

#### Table of Content

* Preface: Table of Content

* 4: Github Example

* 5: Gitlab Example

* 6: Bitbucket Example

* What is Next ?

-- -- --

### 4: Deploy SSG manually on Github

#### Add Remote

You must make a repository first in github before doing this.

{{< highlight bash >}}
$ git remote add github git@github.com:epsi-rns/pelican-test.git

$ git remote -v
github	git@github.com:epsi-rns/pelican-test.git (fetch)
github	git@github.com:epsi-rns/pelican-test.git (push)
{{< / highlight >}}

#### Push All

{{< highlight bash >}}
$ git push --set-upstream github develop
Enumerating objects: 261, done.
Counting objects: 100% (261/261), done.
Delta compression using up to 2 threads
Compressing objects: 100% (250/250), done.
Writing objects: 100% (261/261), 470.62 KiB | 1.41 MiB/s, done.
Total 261 (delta 18), reused 0 (delta 0)
remote: Resolving deltas: 100% (18/18), done.
To github.com:epsi-rns/pelican-test.git
 * [new branch]      develop -> develop
Branch 'develop' set up to track remote branch 'develop' from 'github'.

$ git push --set-upstream github master
Enumerating objects: 181, done.
Counting objects: 100% (181/181), done.
Delta compression using up to 2 threads
Compressing objects: 100% (149/149), done.
Writing objects: 100% (180/180), 405.97 KiB | 1.71 MiB/s, done.
Total 180 (delta 81), reused 0 (delta 0)
remote: Resolving deltas: 100% (81/81), done.
remote: 
remote: Create a pull request for 'master' on GitHub by visiting:
remote:      https://github.com/epsi-rns/pelican-test/pull/new/master
remote: 
To github.com:epsi-rns/pelican-test.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'github'.
{{< / highlight >}}

Set your github pages from `none` to `master`.

#### Example Result

Your URL might different than mine.

* 🕷 https://epsi-rns.github.io/pelican-test/

-- -- --

### 5: Deploy SSG manually on Gitlab

#### Copy Build to Master

A slight different with github counterpart, you need to use `public` folder with gitlab.

{{< highlight bash >}}
$ git worktree add ../pelican-site master

$ cp -r output/* ../pelican-site/public/ 
{{< / highlight >}}

-- -- --

#### Add Remote

{{< highlight bash >}}
$ git remote add gitlab git@gitlab.com:epsi-rns/pelican-test.git

$ git remote -v
gitlab	git@gitlab.com:epsi-rns/pelican-test.git (fetch)
gitlab	git@gitlab.com:epsi-rns/pelican-test.git (push)
{{< / highlight >}}

#### Push All

{{< highlight bash >}}
$ git push --set-upstream gitlab develop
Enumerating objects: 261, done.
Counting objects: 100% (261/261), done.
Delta compression using up to 2 threads
Compressing objects: 100% (250/250), done.
Writing objects: 100% (261/261), 470.62 KiB | 2.96 MiB/s, done.
Total 261 (delta 18), reused 0 (delta 0)
remote: Resolving deltas: 100% (18/18), done.
remote: 
remote: 
remote: The private project epsi-rns/pelican-test was successfully created.
remote: 
remote: To configure the remote, run:
remote:   git remote add origin git@gitlab.com:epsi-rns/pelican-test.git
remote: 
remote: To view the project, visit:
remote:   https://gitlab.com/epsi-rns/pelican-test
remote: 
remote: 
To gitlab.com:epsi-rns/pelican-test.git
 * [new branch]      develop -> develop
Branch 'develop' set up to track remote branch 'develop' from 'gitlab'.

$ git push --set-upstream gitlab master
Enumerating objects: 175, done.
Counting objects: 100% (175/175), done.
Delta compression using up to 2 threads
Compressing objects: 100% (143/143), done.
Writing objects: 100% (174/174), 401.88 KiB | 2.98 MiB/s, done.
Total 174 (delta 79), reused 0 (delta 0)
remote: Resolving deltas: 100% (79/79), done.
remote: 
remote: To create a merge request for master, visit:
remote:   https://gitlab.com/epsi-rns/pelican-test/merge_requests/new?merge_request%5Bsource_branch%5D=master
remote: 
To gitlab.com:epsi-rns/pelican-test.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'gitlab'.
{{< / highlight >}}

#### Enable Gitlab Pages

{{< highlight bash >}}
$ touch .gitlab-ci.yml
$ nano .gitlab-ci.yml
$ cat .gitlab-ci.yml
image: alpine:latest

pages:
  stage: deploy
  script:
  - echo 'Nothing to do...'
  artifacts:
    paths:
    - public
  only:
  - master
{{< / highlight >}}

To avoid editor debates, you may also use either `ViM` or `emacs` 🙂.

{{< highlight bash >}}
$ git add --all
$ git status
On branch master
Your branch is up to date with 'gitlab/master'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   .gitlab-ci.yml

$ git commit -m "Site: Enable gitlab Pages"
[master 4874ecc] Site: Enable gitlab Pages
 1 file changed, 12 insertions(+)
 create mode 100644 .gitlab-ci.yml

$ git push --set-upstream gitlab master
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 2 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 394 bytes | 394.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: 
remote: To create a merge request for master, visit:
remote:   https://gitlab.com/epsi-rns/pelican-test/merge_requests/new?merge_request%5Bsource_branch%5D=master
remote: 
To gitlab.com:epsi-rns/pelican-test.git
   745ccb0..4874ecc  master -> master
Branch 'master' set up to track remote branch 'master' from 'gitlab'.
{{< / highlight >}}

#### Example Result

Your URL might different than mine.

* 🕷 https://epsi-rns.gitlab.io/pelican-test/

-- -- --

### 6: Deploy SSG manually on Bitbucket

With bitbucket, in order to enable master branch as a site, you need to set your main branch from develop to master.

#### Add Remote

You must make a repository first in bitbucket before doing this.

{{< highlight bash >}}
$ git remote add bitbucket.io git@bitbucket.org:epsi/epsi.bitbucket.io.git

$ git remote -v
bitbucket.io	git@bitbucket.org:epsi/epsi.bitbucket.io.git (fetch)
bitbucket.io	git@bitbucket.org:epsi/epsi.bitbucket.io.git (push)
{{< / highlight >}}

By the time this guidance is written.
I still do not know how to make bitbucket pages.
So temporarily we use main site instead at `epsi.bitbucket.io`.
Not that I will use this subdomain for something else later.

Alternatively you can use other any repository name,
without showing the real page result.

{{< highlight bash >}}
$ git remote add bitbucket git@bitbucket.org:epsi/pelican-test.git

$ git remote -v
bitbucket	git@bitbucket.org:epsi/pelican-test.git (fetch)
bitbucket	git@bitbucket.org:epsi/pelican-test.git (push)
{{< / highlight >}}

Setting up SSH would be nice.

#### Push All

{{< highlight bash >}}
$ git push --set-upstream bitbucket develop
Enumerating objects: 261, done.
Counting objects: 100% (261/261), done.
Delta compression using up to 2 threads
Compressing objects: 100% (250/250), done.
Writing objects: 100% (261/261), 470.62 KiB | 3.02 MiB/s, done.
Total 261 (delta 18), reused 0 (delta 0)

remote: Resolving deltas: 100% (18/18), done.
To bitbucket.org:epsi/epsi.bitbucket.io.git
 * [new branch]      develop -> develop
Branch 'develop' set up to track remote branch 'develop' from 'bitbucket'.

$ git push --set-upstream bitbucket master
Enumerating objects: 175, done.
Counting objects: 100% (175/175), done.
Delta compression using up to 2 threads
Compressing objects: 100% (143/143), done.
Writing objects: 100% (174/174), 401.88 KiB | 3.02 MiB/s, done.
Total 174 (delta 79), reused 0 (delta 0)
remote: Resolving deltas: 100% (79/79), done.
remote: 
remote: Create pull request for master:
remote:   https://bitbucket.org/epsi/epsi.bitbucket.io/pull-requests/new?source=master&t=1
remote: 
To bitbucket.org:epsi/epsi.bitbucket.io.git
 * [new branch]      master -> master
cd ../Branch 'master' set up to track remote branch 'master' from 'bitbucket'.
{{< / highlight >}}

Set your main branch from develop to master

#### Example Result

Your URL might different than mine.

* 🕷 https://epsi.bitbucket.io/

![git worktree: Site Preview][image-ss-worktree-07]

-- -- --

### What is Next ?

These example are done.
Since it takes too many steps just to push generated site,
then manual CI/CD is not recommended for daily use.

Consider continue reading [ [CI/CD - Travis - Part One][local-whats-next] ].
Finishing this worktree feature guidance with examples.

[//]: <> ( -- -- -- links below -- -- -- )

[local-whats-next]:         {{< baseurl >}}/devops/2020/02/15/ci-cd-travis-01/

[image-ss-worktree-06]:     {{< baseurl >}}assets/posts/devops/2020/02/worktree/04-worktree-06-remote-v.png
[image-ss-worktree-07]:     {{< baseurl >}}assets/posts/devops/2020/02/worktree/04-worktree-07-preview-site.png
