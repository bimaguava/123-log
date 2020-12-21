---
type   : post
title  : "CI/CD - Git Hooks"
date   : 2020-02-19T09:17:35+07:00
slug   : ci-cd-git-hooks
categories: [devops]
tags      : [git, ssg, deploy]
keywords  : [static site, git hooks]
author : epsi
opengraph:
  image: assets/site/images/topics/git.png

toc    : "toc-2020-02-ci-cd-ssg"

excerpt:
  Deploy SSG manually without CI/CD, utilizing git hooks feature.
  Doing deployment from local, instead of server side.
  This deployment method is using Jekyll, Hexo, and Hugo as SSG test bed.  
---

### Preface

> Goal: Deploy SSG in Git Hooks

You should know that you can do CI/CD locally,
just pure git and bash, without any third party service.
Doing deployment from local, instead of server side,
sometimes needed if you have your own VPS,
or maybe just writing to `/var/www/html` for use in intranet.

There are so many potential use of` git hooks`.
This article is only an example.
`git hooks` can be utiliized for many thing else.

#### Official Documentation

* [8.3 Customizing Git - Git Hook][official-docs]

#### Table of Content

* Preface: Table of Content

* 1: Refspec: Jekyll Case

* 2: Refspec: Hexo Case

* 3: Worktree: Hugo Case

* What is Next ?

-- -- --

### 1: Refspec: Jekyll Case

I know it sound silly.
Why would I need to build Jekyll manually,
while github already doing it for us?
As I already said, it is only for curiosity reason,
not foir daily use.

#### Create Master Branch

Let's get it started.

{{< highlight bash >}}
❯ git clone git@github.com:epsi-rns/manual-jekyll.git
Cloning into 'manual-jekyll'...
warning: You appear to have cloned an empty repository.
❯ cd manual-jekyll
{{< / highlight >}}

#### Copy Jekyll Source Files

As usual, I already have a ready to use Jeykll example.

{{< highlight bash >}}
❯ touch .nojekyll
❯ git add .
❯ git commit -m "First Commit" --quiet
[master (root-commit) e6ac8ca] First Commit
 209 files changed, 19053 insertions(+)
❯ git push -u origin master --quiet
Branch 'master' set up to track remote branch 'master' from 'origin'.
{{< / highlight >}}

#### Preparing Script

`git hooks` just a script. You can use bash, perl, python, ruby or else.
There are many event that can utilized as a hooked.
In this case, we use `pre push` hook.

First thing to do is to make it executable.

{{< highlight bash >}}
❯ chmod +x .git/hooks/pre-push
{{< / highlight >}}

To get the root directory of my repository I use this command

{{< highlight bash >}}
❯ git rev-parse --show-toplevel
/media/Works/repository/manual/manual-jekyll
{{< / highlight >}}

And we can build Jekyll directly to any directory,
instead of the default `_site`.

{{< highlight bash >}}
❯ jekyll build -d "$builddir"
{{< / highlight >}}

And last, we need a new directory,
that would be pushed `refs/heads/gh-pages` branch.

{{< highlight bash >}}
git commit -m "Update at $(date)" --quiet
git push origin master:refs/heads/gh-pages --force
{{< / highlight >}}

#### Pre Push Hook Script

I copy paste my steps from my refspec article.
After trial and error, I got this script:

{{< highlight bash >}}
#!/bin/sh

remote="$1"
url="$2"

sourcedir=$(git rev-parse --show-toplevel)
builddir="${sourcedir}/../build-jekyll"
mkdir $builddir

jekyll build -d "$builddir"
cd "$builddir"

git init
git remote add origin git@github.com:epsi-rns/manual-jekyll.git
git add .
git commit -m "Update at $(date)" --quiet
git push origin master:refs/heads/gh-pages --force

cd "$sourcedir"
rm -rf "$builddir"

exit 0
{{< / highlight >}}

When you push master branch.
The screen is showing push to `gh-pages` instead.

![Git Hooks: Pre Push Jekyll][image-ss-hooks-01]

It is very simple really.

#### Preview

Please enjoy the render at

* <https://epsi-rns.github.io/manual-jekyll/>

-- -- --

### 2: Refspec: Hexo Case

What if, we should face an SSG,
that do not have feature to generate to specific directory,
such as Hexo?

> Use the `bash`, luke.

#### Preparing Repository

As usual we need to preapre repository.

From creating `master` branch

{{< highlight bash >}}
❯ git clone git@github.com:epsi-rns/manual-hexo.git
Cloning into 'manual-hexo'...
warning: You appear to have cloned an empty repository.
❯ cd manual-hexo
{{< / highlight >}}

And then copy Hexo's source files

{{< highlight bash >}}
❯ git add .
❯ git commit -m "First Commit" --quiet
[master (root-commit) e6ac8ca] First Commit
 209 files changed, 19053 insertions(+)
❯ git push -u origin master --quiet
Branch 'master' set up to track remote branch 'master' from 'origin'.
{{< / highlight >}}

![Git Hooks: Prepare Hexo][image-ss-hooks-02]

#### Preparing Script

All we need is to move the generated file,
to a new directory that would be pushed `refs/heads/gh-pages` branch.

{{< highlight bash >}}
hexo generate  --silent
cd "$builddir"
rm -rf *
mv ${sourcedir}/public/* .
{{< / highlight >}}

#### Pre Push Hook Script

I copy paste my steps from my Jekyll configuration above,
with very few adjustment.

{{< highlight bash >}}
#!/bin/sh

remote="$1"
url="$2"

sourcedir=$(git rev-parse --show-toplevel)
builddir="${sourcedir}/../build-hexo"
mkdir $builddir

hexo generate  --silent
cd "$builddir"
rm -rf *
mv ${sourcedir}/public/* .

git init
git remote add origin git@github.com:epsi-rns/manual-hexo.git
git add .
git commit -m "Update at $(date)" --quiet
git push origin master:refs/heads/gh-pages --force

cd "$sourcedir"
rm -rf "$builddir"

exit 0
{{< / highlight >}}

![Git Hooks: Pre Push Hexo][image-ss-hooks-03]

When you push master branch.
The screen is showing push to `gh-pages` instead.

#### Preview

Please enjoy the render at

* <https://epsi-rns.github.io/manual-hexo/>

-- -- --

### 3: Worktree: Hugo Case

Can we do it using `worktree` instead of `refpec`?

#### Recursive Issue

Be aware of **recursive** hooks calls.

My previous worktree example contain something like this:

{{< highlight bash >}}
git push --set-upstream origin gh-pages --force
{{< / highlight >}}

When you push to `gh-pages`,
this will trigger another `pre-push` event hook.

The solution is to check,
whether the branch is `gh-pages` or not,
buy using this `git` command:

{{< highlight bash >}}
❯ git rev-parse --abbrev-ref HEAD
master
{{< / highlight >}}

The conditional skeleton is as below.

{{< highlight bash >}}
current=$(git rev-parse --abbrev-ref HEAD)

if [ "$current" != "gh-pages" ]; then
  ...
  git push --set-upstream origin gh-pages --force
  ...
fi
{{< / highlight >}}

#### Pre Push Hook Script

After trial and error, I finally  got it working.
The complete script is a little bit long, as shown below:

{{< highlight bash >}}
#!/bin/sh

remote="$1"
url="$2"

current=$(git rev-parse --abbrev-ref HEAD)

if [ "$current" != "gh-pages" ]; then

  # generate
  hugo='/media/Works/bin/hugo-62'
  $hugo --quiet
  
  # gh-pages branch

  sourcedir=$(git rev-parse --show-toplevel)
  builddir="${sourcedir}/../build-hugo"

  echo "$builddir"

  git worktree add $builddir gh-pages

  cd "$builddir"
  pwd
  find . -maxdepth 1 ! -name '.git' -exec rm -rf {} \;
  mv ${sourcedir}/public/* .

  git add .
  git commit --allow-empty -m "$(git log master -1 --pretty=%B)"
  git push --set-upstream origin gh-pages --force

  cd "$sourcedir"
  git worktree remove $builddir --force
fi

exit 0
{{< / highlight >}}

Do not forget to clean up with `git worktree remove`.

![Git Hooks: Pre Push Hugo][image-ss-hooks-04]

#### Preview

Please enjoy the render at

* <https://epsi-rns.github.io/manual-hugo/>

-- -- --

### Conclusion

You can use either `refspec` method or `worktree` method.

Talking about build locally.
We are going to have fun with different situation using Jenkins.

Have fun with configuring.

[//]: <> ( -- -- -- links below -- -- -- )

[official-docs]:    https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks

[image-ss-hooks-01]:    {{< baseurl >}}assets/posts/devops/2020/02//hooks/09-githook-01-jekyll-build.png
[image-ss-hooks-02]:    {{< baseurl >}}assets/posts/devops/2020/02//hooks/09-githook-02-hexo-prepare.png
[image-ss-hooks-03]:    {{< baseurl >}}assets/posts/devops/2020/02//hooks/09-githook-03-hexo-build.png
[image-ss-hooks-04]:    {{< baseurl >}}assets/posts/devops/2020/02//hooks/09-githook-04-hugo-build.png
