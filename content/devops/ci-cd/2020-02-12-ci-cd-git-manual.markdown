---
type   : post
title  : "CI/CD - Git Refs"
date   : 2020-02-12T09:17:35+07:00
slug   : ci-cd-git-refs
categories: [devops]
tags      : [git, ssg, deploy]
keywords  : [static site, git refs]
author : epsi
opengraph:
  image: assets/site/images/topics/git.png

toc    : "toc-2020-02-ci-cd-ssg"

excerpt:
  Deploy SSG manually without CI/CD, utilizing git refs feature.
  This deployment method is using Eleventy as SSG test bed.
---

### Preface

> Goal: Deploy SSG manually without CI/CD, utilizing git refs feature.

How about deploying SSG without third party CI/CD ?
Sure, you can deploy manually, using only your git client on local PC,
or notebook, or whatever you call your workstation.

#### The Challenge

It is common for SSG user to have build directory such as:
`_site` or `public` or `dist` or `output`,
or whatever you SSG configuration setup is.

How do I write from
subdirectory `_site` in local `master` branch,
into root directory in remote `gh-pages` branch ?

#### Example

I'm using Eleventy SSG as an example.
It is still rare that people using Eleventy.
But do not worry. The example should be easy to follow.

Hypotethically, this example also applied for other SSG as well,
such as: Jekyll, Hugo, Hexo, or Pelican.

However, this article is only an example of,
how generated can be pushed manually.
The methods described here is not recommended for daily use.

> Manual CI/CD is not recommended for daily use.

#### Table of Content

* Preface: Table of Content

* 1: Understanding Refs

* 2: Prepare Your Repository

* 3: Generate Build

* 4: Build Directory

* 5: Push To Github Pages

* What is Next ?

-- -- --

### 1: Understanding Refs

In the end of this article, I'm using `git refs`, to avoid `git checkout`.
Making your step, one line shorter.

What is this `git refs` anyway?
The official documentation is here:

* [10.5 Git Internals - The Refspec][git-refspec]

If you ever have any git repository,
you can check in your `.git/config`.

![git refs: Refspec in .git/config][image-ss-refs-00a]

Now you know that you can push directly
**from a branch to another branch**,
even though the branch does not exist yet.

#### Tale of Two Branches

Using the most common workflow for SSG in github,
there are two branches, 

1. `master` branch for source, and 
2. `gh-pages` branch for generated site.

We are going to use this scheme.

#### Two Directories.

Imagine that we have two directories for each

1. `ssg-repositories` containing `master` branch for **source code**.

2. `ssg-site` for generated site aka **build code**.

Notice that both are using `master` branch.

![git refs: Two Masters][image-ss-refs-00b]

Since we can push directly from `master` branch to `gh-pages` branch,
we can do this from `ssg-site`, and our job is done just like that.

{{< highlight bash >}}
$ git push origin master:refs/heads/gh-pages --force
{{< / highlight >}}

-- -- --

### 2: Prepare Your Repository

Now, it is a good time to practice with example,
so you can have more understanding.

#### Directory

I use Eleventy as an example SSG.
You may use other.

{{< highlight bash >}}
$ mkdir 11ty-repository
$ cd 11ty-repository
{{< / highlight >}}

#### Git Remote

Then the `git` part.

{{< highlight bash >}}
$ git init
Initialized empty Git repository in /media/Works/repository/test/11ty-repository/.git/

$ git remote add origin git@github.com:epsi-rns/manual-11ty.git
$ git remote -v
origin	git@github.com:epsi-rns/manual-11ty.git (fetch)
origin	git@github.com:epsi-rns/manual-11ty.git (push)
{{< / highlight >}}

#### SSG Source Code

Continue to the SSG source part.
I have already had a ready to use Eleventy Source,
in a directory named `11ty-example`.

{{< highlight bash >}}
$ cp -r ../11ty-example/. .
$ ls
assets        package.json  sass
Gruntfile.js  README.md     src
{{< / highlight >}}

#### First Commit

Now go back to `git` part.
Assuming that all the reader here already get used with `git` command,
I use `--quiet` parameter, so that the example would not go too long,
unnecessary lines.

{{< highlight bash >}}
$ git add --all
$ git commit -m "Master: First Commit" --quiet
$ git push -u origin master --quiet
{{< / highlight >}}

This should be self explanatory.

![git refs: Preparing Master Source][image-ss-refs-01]

#### Master Branch in Github Repository

Remember that, this is the `master` branch,
that contain the **source code**.

![git refs: Master Branch in Github Repository][image-ss-refs-02]

It is only containing one commit.
The `first commit`.

-- -- --

### 3: Generate Build

Since I use Eleventy, this is the example command.
You may use other command for Jekyll, Hexo, Hugo, or Pelican.

#### Eleventy Build

{{< highlight bash >}}
$ npm install
$ npx eleventy
$ npx eleventy serve
...
Copied 1 item and Processed 47 files in 1.67 seconds (35.5ms each)
Watching…
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:8080
    External: http://192.168.1.223:8080
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 --------------------------------------
[Browsersync] Serving files from: _site/_eleventy_redirect
{{< / highlight >}}

![git refs: Eleventy Serve][image-ss-refs-03]

#### Build Directory

Consider check the generated files as result of this build process.

{{< highlight bash >}}
$ ls _site
assets              feed        lyrics  posts   tags
_eleventy_redirect  index.html  pages   quotes
{{< / highlight >}}

For any SSG user, this must be also self explanatory.

![git refs: Generated Build Code][image-ss-refs-04]

Now we have the **build code**.

-- -- --

### 4: Build Directory

Now it is a good time to remind you the main question.

How do I write from
subdirectory `_site` in local `master` branch,
into root directory in remote `gh-pages` branch ?

#### Copy Generated Site

Consider make a new directory **without** any `git`.
We will setup `git` later.

{{< highlight bash >}}
$ cd ..
$ mkdir 11ty-site
$ cd 11ty-site
{{< / highlight >}}

Then copy the generated one into this newbuild directory.

{{< highlight bash >}}
$ cp -a ../11ty-repository/_site/* .
$ ls
assets              feed        lyrics  posts   tags
_eleventy_redirect  index.html  pages   quotes
{{< / highlight >}}

![git refs: Site Directory][image-ss-refs-05]

#### Setup Git

We must setup new `git` in this directory.
Notice that this `git` here is not related at all,
with previous `git` directory.
Both are different `git`.

{{< highlight bash >}}
$ git init
$ git remote add origin git@github.com:epsi-rns/manual-11ty.git

$ git add .
$ git commit -m "Update at $(date)" --quiet
$ git log | cat
commit b232faa3e83f4ef94b4c1b74d9b5683f6a1a1d66
Author: epsi sayidina <epsi.rns@gmail.com>
Date:   Wed Mar 25 20:04:13 2020 +0700

    Update at Wed 25 Mar 2020 08:04:13 PM WIB
{{< / highlight >}}

![git refs: New Git Site Directory][image-ss-refs-06]

-- -- --

### 5: Push To Github Pages

Consider `git push` directly to `gh-pages`.

#### Directly

Why this would be failed.

{{< highlight bash >}}
$ git push origin gh-pages --force
{{< / highlight >}}

![git refs: Git Push Error][image-ss-refs-11]

Because you haven't setup `gh-pages` branch yet.

#### Using Checkout

The solution is simply to do `git checkout -b`
before `git push`.

{{< highlight bash >}}
$ git checkout -b gh-pages
Switched to a new branch 'gh-pages'

$ git add .
$ git commit -m "Update at $(date)" --quiet

$ git push -u origin gh-pages --force
Enumerating objects: 130, done.
Counting objects: 100% (130/130), done.
Delta compression using up to 2 threads
Compressing objects: 100% (83/83), done.
Writing objects: 100% (130/130), 311.83 KiB | 896.00 KiB/s, done.
Total 130 (delta 43), reused 0 (delta 0)
remote: Resolving deltas: 100% (43/43), done.
To github.com:epsi-rns/manual-11ty.git
 + 7837478...4cc23b9 gh-pages -> gh-pages (forced update)
Branch 'gh-pages' set up to track remote branch 'gh-pages' from 'origin'.
{{< / highlight >}}

![git refs: Git Checkout and Push][image-ss-refs-12]

#### Using Refspec

Switching branches, then switching back, in manual work is error prone.
You can avoid `checkout`,
and shorter the process with this `source:target` namespace,
such as`master:refs/heads/gh-pages`, as shown below.

{{< highlight bash >}}
$ git push origin master:refs/heads/gh-pages --force
Enumerating objects: 130, done.
Counting objects: 100% (130/130), done.
Delta compression using up to 2 threads
Compressing objects: 100% (83/83), done.
Writing objects: 100% (130/130), 311.83 KiB | 1.08 MiB/s, done.
Total 130 (delta 43), reused 0 (delta 0)
remote: Resolving deltas: 100% (43/43), done.
remote: 
remote: Create a pull request for 'gh-pages' on GitHub by visiting:
remote:      https://github.com/epsi-rns/manual-11ty/pull/new/gh-pages
remote: 
To github.com:epsi-rns/manual-11ty.git
 * [new branch]      master -> gh-pages
{{< / highlight >}}

![git refs: Push using Refspec][image-ss-refs-13]

#### gh-pages Branch in Github Repository

The result of the `git push` should be in repository by now.

![git refs: gh-pages Branch in Github Repository][image-ss-refs-14]

Remember that, this is the `gh-pages` branch,
that contain the **build code**.

#### Live Site Preview

The github pages will render the site based on this **build code**.

![git refs: Live Site Preview][image-ss-refs-15]

You can enjoy the preview at:

* https://epsi-rns.github.io/manual-11ty/

-- -- --

### What is Next ?

Done with these steps.
Now it is time to relax, use the easier step, using automation.

Consider continue reading [ [CI/CD - Zeit Now][local-whats-next] ].
Start from easy deploying. Zeit Now step by step.

[//]: <> ( -- -- -- links below -- -- -- )

[local-whats-next]:     {{< baseurl >}}/devops/2020/02/13/ci-cd-zeit-now/
[git-refspec]:          https://git-scm.com/book/en/v2/Git-Internals-The-Refspec

[image-ss-refs-00a]:    {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-00-git-refs-heads-master.png
[image-ss-refs-00b]:    {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-00-two-masters.png
[image-ss-refs-01]:     {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-01-master-source.png
[image-ss-refs-01b]:    {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-01-master-source-alternate.png
[image-ss-refs-02]:     {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-02-repo-branch-master.png
[image-ss-refs-03]:     {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-03-ssg-11ty-serve.png
[image-ss-refs-04]:     {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-04-ssg-build-result.png
[image-ss-refs-05]:     {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-05-site-directory.png
[image-ss-refs-06]:     {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-06-site-git.png
[image-ss-refs-11]:     {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-11-push-error.png
[image-ss-refs-12]:     {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-12-checkout.png
[image-ss-refs-13]:     {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-13-site-branch-gh-pages.png
[image-ss-refs-14]:     {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-14-repo-branch-gh-pages.png
[image-ss-refs-15]:     {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-15-live-site.png
