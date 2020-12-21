---
type   : post
title  : "CI/CD - Git Worktree - Part One"
date   : 2020-02-14T09:17:35+07:00
slug   : ci-cd-git-worktree-01
categories: [devops]
tags      : [git, ssg, deploy]
keywords  : [static site, worktree]
author : epsi
opengraph:
  image: assets/site/images/topics/git.png

toc    : "toc-2020-02-ci-cd-ssg"

excerpt:
  Deploy SSG manually without CI/CD, utilizing git worktree feature.
  This part only show the basic git command.
---

### Preface

> Goal: Deploy SSG manually without CI/CD, utilizing git worktree feature.

For anyone who think previous Zeit Now Article is too easy,
or think Netlify article is boring.
I have good material for you.

How about deploying SSG without third party CI/CD ?
Sure, you can deploy manually, using only your git client on local PC,
or notebook, or whatever you call your workstation.
We are going to learn method other than git refs.

#### Example

I'm using Pelican SSG as an example.
It is rare that people using Pelican.
But do not worry. The example should be easy to follow.

Hypotethically, this example also applied for other SSG as well,
such as: Jekyll, Hugo, Hexo, or Eleventy.

However, this article is only an example of how `git worktree` works.
The methods described here is not recommended for daily use.

> Manual CI/CD is not recommended for daily use.

After you read this article, you might desire to apply the method,
in other CI/CD, such as Circle-CI or other.
Understanding `git worktree` is crucial step,
before you get your foot, step on complex CI/CD.
It is not a must, but this will shorter your configuration some lines.

#### Table of Content

* Preface: Table of Content

* 1: Understanding Worktree

* 2: Prepare Your Repository

* 3: Source and Build

* What is Next ?

-- -- --

### 1: Understanding Worktree

Why do we need worktree 🤔?

Because most practice in simple SSG,
is putting the `generated site` in the same repository as the `source`.

> In short, we need two branches.

Some says this is bad practice.
But people do it anyway, so why bother?
As long as the repository is yours alone to work with, you are safe.

This method here is not something you want to do on daily basis.
You just need to understand how `worktree` works,
so that you can solve some issue using `worktree` whenever you need.

#### Reading

So you know how to `commmit`? \
You `push` and `pull` in your daily life. \
It is time to leverage your knowledge using worktree.

* <https://git-scm.com/docs/git-worktree>

#### In a nutshell

In a nutshell, `git worktree` enable you to work,
with different branches in a same time.

Normally you can only open one branch at a time,
when you switch `branch`,
the content of your directory will reflect current opened branch.
You cannot edit other branch while working on an active branch.
`git worktree` solve this limitation by opening other branch in other directory.
This means, you can edit both branch at a time.

#### Example

Supposed that I have two branches:

1. 🕷 `develop` for source code, and

2. 🕷 `master` for live site.

Consider these two directories separated by tmux below:

![git worktree: Two Panes tmux][image-ss-worktree-00]

Both directories comes from the same repository.
What make both different is the two branches: `develop` and `master`.

* Top Directory: pelican-repository, using `develop` branch.

* Bottom Directory: pelican-site, using `master` branch.

I also intentionally using
`develop` for source and `master` for live site,
in contrast to common practice,
e.g. `master` for source and `gh-pages` for live site.
Remember that neither gitlab and bitbucket have `gh-pages`.
Thus we need to generalized the situation.

#### Pelican

> This example is using Pelican as an example.

As default, Pelican generate the live site into `output` directory.
Consider see both directories, separated by tmux.

![git worktree: Two Panes tmux, root and output][image-ss-worktree-01]

It is going to be hard to tell github or gitlab or bitbucket,
to use subdirectory as the source of your live site.
Those three above use `branch` instead,  as the source of your live site.

#### Do Not Upload

Normally you don't want to push this `output` directory to repository.
So you tell `.gitignore` not to upload this `output` directory.

{{< highlight bash >}}
output
__pycache__
.pyc
{{< / highlight >}}

#### Branches

With `git worktree`, you can copy from build `output`,
from `develop` branch to `master` branch.

This is what we desire to achieve:

![git worktree: Two Panes tmux, develop and master][image-ss-worktree-02]

We can just copy-paste from `output` directory from `develop` branch,
into root directory in `master` branch.
Because the process is just copying from a directory to other directory.

-- -- --

### 2: Prepare Your Repository

Now it is a good time to get start with an example.

Please do not get intimidated of the long commands.
Just type it, and you will get the same result.

The application in real life example,
should be only a few lines.
Much more shorter than example below.
Once you get the idea.
This is not scary at all.

#### Init Git

{{< highlight bash >}}
$ mkdir pelican-repository
$ cd pelican-repository
$ git init
Initialized empty Git repository in /media/Works/repository/test/pelican-repository/.git/
{{< / highlight >}}

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
MASTER.md
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

#### Clean up

{{< highlight bash >}}
$ git add --all
$ git status
	deleted:    MASTER.md
$ git commit -m "Develop: Clean up MASTER.md"
$ ls
DEVELOP.md
{{< / highlight >}}

So that we now have both clear

{{< highlight bash >}}
$ git checkout master
Switched to branch 'master'
$ ls
MASTER.md
$ git checkout develop
Switched to branch 'develop'
$ ls
DEVELOP.md
{{< / highlight >}}

#### Add Worktree

{{< highlight bash >}}
$ git worktree list
/media/Works/repository/test/pelican-repository  0f1ab9e [develop]
$ git worktree add ../pelican-site master
Preparing worktree (checking out 'master')
HEAD is now at 28036ae Master: First Commit
$ ls ../pelican-site/
MASTER.md
{{< / highlight >}}

Now your branch should like this below:

![git worktree: Two Panes tmux, prepare branch][image-ss-worktree-03]

-- -- --

### 3: Source and Build

Now come the SSG part. 

#### Pelican Example

I have already prepare my pelican site in other directory,
let's say `pelican-example`.

You can have it from here:

* https://gitlab.com/epsi-rns/tutor-pelican-bulma-md

Pick any steps you want, and put it there.
In my case, I copy only the last step `step-07` into root directory.

#### Add Source Code to Develop

{{< highlight bash >}}
$ cp -rT ../pelican-example/ ./

$ ls -a
.   content     .git        lib       output          plugins         README.md  tutor-07
..  DEVELOP.md  .gitignore  Makefile  pelicanconf.py  publishconf.py  tasks.py

$ cat .gitignore
output
__pycache__
.pyc
*.swp
*.swo
{{< / highlight >}}

#### Build Site

{{< highlight bash >}}
$ make publish
pelican \
     /media/Works/repository/test/pelican-repository/content \
  -o /media/Works/repository/test/pelican-repository/output \
  -s /media/Works/repository/test/pelican-repository/pelicanconf.py 
Done: Processed 10 articles, 0 drafts, 3 pages, 0 hidden pages and 0 draft pages in 2.21 seconds.

$ ls output
2014  2017  2019      archives.html    author        blog             category  index.html  tag        theme
2015  2018  archives  archives.py.txt  authors.html  categories.html  feed.xml  pages       tags.html
{{< / highlight >}}

#### Copy Build to Master

We should commit each branch separately.

{{< highlight bash >}}
$ cp -r output/* ../pelican-site/ 

$ ls ../pelican-site/ 
2014  2017  2019      archives.html    author        blog             category  index.html  tag        theme
2015  2018  archives  archives.py.txt  authors.html  categories.html  feed.xml  pages       tags.html
{{< / highlight >}}

Now it is a good time to compare both `develop:/output` and `master:/`.

![git worktree: Two Panes tmux, prepare branch][image-ss-worktree-04]

The only different is, the `MASTER.md`.
In real life configuration.
It is common to delete all before copy,
so you have clean land to start with.

#### Commit Source Code

{{< highlight bash >}}
$ git status
On branch develop
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	Makefile
	README.md
	content/
	lib/
	pelicanconf.py
	plugins/
	publishconf.py
	tasks.py
	tutor-07/

$ git add --all

$ git commit -m "Add pelican example source"
{{< / highlight >}}

-- -- --

#### Commit Build Site

{{< highlight bash >}}
$ cd ../pelican-site

$ git status
On branch develop
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	2014/
	2015/
	2017/
	2018/
	2019/
	archives.html
	archives.py.txt
	archives/
	author/
	authors.html
	blog/
	categories.html
	category/
	feed.xml
	index.html
	pages/
	tag/
	tags.html
	theme/

$ git add --all

$ git commit -m "First Build"
{{< / highlight >}}

#### Git Log

Now consider comparing `HEAD` for each branches.

{{< highlight bash >}}
$ git log --graph --full-history --all --pretty=format:"%h%x09%d%x20%s" | cat
* 4f08227	 (master) First Build
| * 701bc4e	 (HEAD -> develop) Add pelican example source
| * 0f1ab9e	 Develop: Clean up MASTER.md
| * 9c7cea2	 Develop: Second Commit
|/  
* 28036ae	 Master: First Commit%   
{{< / highlight >}}

![git worktree: Two Panes tmux, prepare HEAD for each branches][image-ss-worktree-05]

Each directory show different `HEAD`, reflecting each branch.

-- -- --

### What is Next ?

Done with these steps.
Now it is time to push to either bitbucket or gitlab or github.

Consider continue reading [ [CI/CD - Git Worktree - Part Two][local-whats-next] ].
Finishing this worktree feature guidance with examples.

[//]: <> ( -- -- -- links below -- -- -- )

[local-whats-next]:         {{< baseurl >}}/devops/2020/02/14/ci-cd-git-worktree-02/

[image-ss-worktree-00]:     {{< baseurl >}}assets/posts/devops/2020/02/worktree/04-worktree-00-nutshell.png
[image-ss-worktree-01]:     {{< baseurl >}}assets/posts/devops/2020/02/worktree/04-worktree-01-develop-branch.png
[image-ss-worktree-02]:     {{< baseurl >}}assets/posts/devops/2020/02/worktree/04-worktree-02-master-branch.png
[image-ss-worktree-03]:     {{< baseurl >}}assets/posts/devops/2020/02/worktree/04-worktree-03-prepare-branch.png
[image-ss-worktree-04]:     {{< baseurl >}}assets/posts/devops/2020/02/worktree/04-worktree-04-compare-master-output.png
[image-ss-worktree-05]:     {{< baseurl >}}assets/posts/devops/2020/02/worktree/04-worktree-05-compare-head.png
