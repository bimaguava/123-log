---
type   : post
title  : "Git Pages - Deploying"
date   : 2018-08-15T09:17:35+07:00
slug   : git-hosting
categories: [devops]
tags      : [git, html]
keywords  : [static site, git, github, gitlab, plain html, hugo]
author : epsi
opengraph:
  image: assets/site/images/topics/git.png

toc    : "toc-2018-09-hugo-bootstrap-step"

excerpt:
  Hosting on Github Pages for Dummies.

---

### Preface

This article is intended for beginner.

> Goal: Making Github/ Gitlab Pages Step By Step

#### Table of Content

Here, I present a Hugo Tutorial, step by step, for beginners.

* Preface: Table of Content

* 1: Create Account

* 2: Practice Basic Git

* 3: Create Github Page: Plain HTML

* 4: Create Gitlab Page: Plain HTML

* 5: Gitlab Page: Deploy Hugo

* Conclusion

-- -- --

### Create Account

#### Where ?

You can create git repository using

* <https://github.com/>

* <https://about.gitlab.com/>

* <https://bitbucket.org/>

#### Practice

Now you can make repository, with any name:

* <https://github.com/epsi-rns/anycode>

* <https://gitlab.com/epsi-rns/dotfiles>

Note that, this is just an example,
you should use your username account.
and you should use your own repository.

#### Clone

After make a repository, clone your own repository to your directory.

{{< highlight bash >}}
$ git clone https://github.com/epsi-rns/anycode
$ cd anycode
{{< / highlight >}}

Now you should continue to basic git.

-- -- --

### Basic Git

New to git ? Read this first:

*	<https://epsi-rns.github.io/opensource/2018/01/15/using-git.html>

That article above will guide you common git task such as:

#### Check First

{{< highlight bash >}}
$ git status
{{< / highlight >}}

#### Add and Check Status

{{< highlight bash >}}
$ git add --all
$ git status
{{< / highlight >}}

#### Commit with Message

{{< highlight bash >}}
$ git commit -m "Site: First Commit"
{{< / highlight >}}

#### Push

{{< highlight bash >}}
$ git push -u origin master
{{< / highlight >}}

-- -- --

### Create Github Page: Plain HTML

I start with github, because it is easier, for beginner.
Later we are going to use gitlab, that is more flexible.

#### Reading

*	<https://pages.github.com/>

#### Create Repository

You should repository name, that match your name, for example:

*	<https://github.com/epsi-rns/epsi-rns.github.io>

Clone your own repository on terminal.

{{< highlight bash >}}
$ git clone https://github.com/epsi-rns/epsi-rns.gitlab.io
$ cd epsi-rns.gitlab.io
{{< / highlight >}}

In github, do not use uppercase.
And do not rename repository.
If you make mistakes in repository naming,
you'd better create the repository from scratch.

#### Create index.html.

Then make a simple <code>index.html</code> containing simple message,
such as <code>"hello world"</code>.

{{< highlight bash >}}
$ echo "<p>Hello, World</p>" > index.html
{{< / highlight >}}

Do not forget to <code>add</code>, <code>commit</code>
and <code>push</code> to <code>master</code>.

Here is an example of the source of my project page on github.

*	<https://github.com/epsi-rns/demo-plain>

![Github: Project Page Repository][image-ss-github-plain-source]

#### Check Setting.

If it said <code>ready to be published</code>,
then something is missing.

You should choose branch, such as master, as your source.

![Github: Site Setting Master][image-ss-github-setting-site]

#### Open in Browser.

*	<https://epsi-rns.github.io>

Here is an example of the output my project page.

*	<https://epsi-rns.github.io/demo-plain/>

![Github: Project Page in Browser][image-ss-github-plain-site]

-- -- --

### Create Gitlab Page: Plain HTML

While github only support Jekyll,
gitlab support many SSG,
including plain text.

This means gitlab require more setup using <code>.gitlab-ci.yml</code>.

#### Reading

*	<https://gitlab.com/pages/plain-html>

#### Create Repository

You should repository name, that match your name, for esample

*	<https://gitlab.com/epsi-rns/epsi-rns.gitlab.io>

Clone your own repository on terminal.

{{< highlight bash >}}
$ git clone https://github.com/epsi-rns/epsi-rns.gitlab.io
$ cd epsi-rns.gitlab.io
{{< / highlight >}}

#### Create public directories

Gitlab plain html use public directories.
You should make this directories first.

{{< highlight bash >}}
$ mkdir public
$ cd public
{{< / highlight >}}

#### Create index.html.

Create a simple <code>index.html</code> containing simple message,
such as <code>"hello world"</code>.

{{< highlight bash >}}
$ echo "<p>Hello, World</p>" > index.html
{{< / highlight >}}

#### Create .gitlab-ci.yml

Plain html setting for 
<code>.gitlab-ci.yml</code> is as simply as below:

{{< highlight yaml >}}
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

Now it is a good time <code>add</code>, <code>commit</code>
and <code>push</code> to <code>master</code>.

You should see <code>Jobs</code> menu
in <code>CI/CD</code> in gitlab site.

![Gitlab: Jobs Menu][image-ss-gitlab-jobs-menu]

#### Gitlabs Runner

you should see the <code>Jobs CI</code>, something similar as below:

{{< highlight conf >}}
Running with gitlab-runner 11.2.0-rc2 (1644837a)
  on docker-auto-scale fa6cab46
Using Docker executor with image alpine:latest ...
Pulling docker image alpine:latest ...
Using docker image sha256:11cd0b38bc3ceb958ffb2f9bd70be3fb317ce7d255c8a4c3f4af30e298aa1aab for alpine:latest ...
Running on runner-fa6cab46-project-8124772-concurrent-0 via runner-fa6cab46-srm-1535465534-7eb4894d...
Cloning repository...
Cloning into '/builds/epsi-rns/site-plain'...
Checking out 42afacfb as master...
Skipping Git submodules setup
$ echo 'Nothing to do...'
Nothing to do...
Uploading artifacts...
public: found 5 matching files                     
Uploading artifacts to coordinator... ok            id=92747504 responseStatus=201 Created token=S98g_FHG
Job succeeded
{{< / highlight >}}

![Gitlab: Jobs CI Verbose][image-ss-gitlab-jobs-ci]

#### Open in Browser.

*	<https://epsi-rns.gitlab.io>

Here is an example of the output of my project page on gitlab.

*	<https://epsi-rns.gitlab.io/demo-plain/>

Your site, might have different looks.

-- -- --

### 5: Gitlab Page: Deploy Hugo

As has been said before, gitlab support some SSG, including Hugo.

#### Reading

*	<https://gitlab.com/pages/hugo>

#### .gitlab-ci.yml for Project Pages

Project Pages, can be set to use their own URL.

Supposed you have this </code>code>config.toml</code>.

{{< highlight toml >}}
baseURL      = "http://epsi-rns.gitlab.io/"
{{< / highlight >}}

Your development server will open url at <http://localhost:1313>.

If you want to use project pages such as </code>code>/demo-hugo</code>,
you can set it in <code>.gitlab-ci.yml</code> as below:

{{< highlight yaml >}}
image: registry.gitlab.com/pages/hugo:latest

variables:
  GIT_SUBMODULE_STRATEGY: recursive

pages:
  script:
  - hugo --baseURL="https://epsi-rns.gitlab.io/demo-hugo/"
  artifacts:
    paths:
    - public
  only:
  - master
{{< / highlight >}}

After <code>add</code>, <code>commit</code>
and <code>push</code> to <code>master</code>.
You should see <code>Jobs</code> menu
in <code>CI/CD</code> in gitlab site.

* <https://gitlab.com/epsi-rns/epsi-rns.gitlab.io/-/jobs/>

![Gitlab: Hugo Job List][image-ss-gitlab-hugo-jobs]

And you can also see the result:

![Gitlab: Hugo Job Docker CI][image-ss-gitlab-hugo-job-ci]

-- -- --

### Conclusion

This is our last article in our Hugo tutorial.
There is no next article. 
Now it is your turn to explore your creativity.

Have fun with coding.

[//]: <> ( -- -- -- links below -- -- -- )

[image-ss-github-plain-site]:   {{< baseurl >}}assets/posts/ssg/2018/08/github-demo-plain-site.png
[image-ss-github-plain-source]: {{< baseurl >}}assets/posts/ssg/2018/08/github-demo-plain-source.png
[image-ss-github-setting-site]: {{< baseurl >}}assets/posts/ssg/2018/08/github-setting-site.png
[image-ss-gitlab-jobs-menu]:    {{< baseurl >}}assets/posts/ssg/2018/08/gitlab-jobs-menu.png
[image-ss-gitlab-jobs-ci]:      {{< baseurl >}}assets/posts/ssg/2018/08/gitlab-jobs-ci.png
[image-ss-gitlab-hugo-job-ci]:  {{< baseurl >}}assets/posts/ssg/2018/08/gitlab-hugo-job-runner.png
[image-ss-gitlab-hugo-jobs]:    {{< baseurl >}}assets/posts/ssg/2018/08/gitlab-hugo-jobs.png
