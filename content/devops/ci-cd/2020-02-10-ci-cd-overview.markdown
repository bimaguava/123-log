---
type   : post
title  : "CI/CD - Deploy Overview"
date   : 2020-02-10T09:17:35+07:00
slug   : ci-cd-overview
categories: [devops]
tags      : [git, ssg, deploy]
keywords  : [static site, overview]
author : epsi
opengraph:
  image: assets/site/images/topics/git.png

toc    : "toc-2020-02-ci-cd-ssg"

excerpt:
  Overview of CI/CD for SSG.
---

### Preface

> Goal: Overview of deploying SSG in repository.

How many ways to deploy your static site?
I found at least ten ways to deploy SSG site.

We are going to to learn how to be a junior devops,
to be precise, a **YAML Engineer**.

#### Table of 

This guidance is intended for beginner.
Professional should read manual page instead 🙂.

* Preface: Table of Content

* 1: Issue: Minutes Build

* 2: Choice: Deploying Method

* What is Next ?

-- -- --

### Issue

I already have three blogs.
And I want to make my fourth one.

I desire to consider something else.
Because I have already use github pages, gitlab pages and netlify.

One of the issue with SSGs is build minute.
So I decide to experiment with methods I never use before.

#### Minutes Build on Free Plans

1. Github Free Plan
   * https://help.github.com/en/github/setting-up-and-managing-billing-and-payments-on-github/about-billing-for-github-actions
   * Build Limit: 2000 minutes/months

2. Gitlab CI/CD Free Plan
   * https://about.gitlab.com/pricing/
   * Build Limit: 2,000 CI pipeline minutes per group per month on our shared runners

3. Bitbucket Pipelines Free Plan
   * https://bitbucket.org/product/pricing
   * Build Limit: 50 minutes/months

4. Netlify Free Plan
   * https://www.netlify.com/pricing/
   * Build Minutes: 300 included/month 

5. Zeit Now Free Plan
   * https://zeit.co/pricing
   * Build Limit: Unknown? 2 Hours per Month.

6. Travis Free Plan
   * https://travis-ci.com/plans
   * Build Limit: Unlimited build minutes

7. CircleCI Free Plan
   * https://circleci.com/pricing/
   * Build Limit: Users on our Free plan can build up to 250 minutes per week using their 2,500 credits.

I do not really understand for each terms.
I just put it there, so  I can find it easily later on.

-- -- --

### Choice: Deploying Method

How many ways to deploy your static site?
I found at least ten ways to deploy SSG site.

#### Easiest One

My first SSG is Jekyll.

* Plain github (jekyll only)

#### Successfully Tried

How about other SSGs ?
I have successfully tested this six ways for these SSG:
Jekyll, Hexo, Hugo, 11ty, Pelican.

0. Gitlab CI
1. Netlify
2. Manual git push
3. Zeit Now
4. Manual git worktree
5. Travis (github only)
6. Circle-ci + github (git worktree)
7. Circle-ci + bitbucket (git worktree)
8. gh-action (github workflow)
9. local git hook (.git/hooks)

#### On Radar

> No Idea

I'm still not sure about this.

10. Jenkins

You might have different idea, outside these above.

-- -- --

### Articles

Consider to discuss it one by one.

#### 0: Github Pages

I have already make article for this.
There is no need to write another article.

* [Making Github/ Gitlab Pages Step By Step][local-git-hosting]

#### 0: Gitlab Pages

All available Hugo versions are listed here:

* https://gitlab.com/pages/hugo/container_registry

Still using the article above, here is my **.gitlab-ci.yml**.

{{< highlight yaml >}}
image: registry.gitlab.com/pages/hugo:latest

variables:
  GIT_SUBMODULE_STRATEGY: recursive

pages:
  script:
  - hugo --baseURL="http://oto-spies.info/"
  artifacts:
    paths:
    - public
  only:
  - master
{{< / highlight >}}

By this time of this writing.
I still do not know If there is a free bitbucket pages.

#### 1: Netlify

I also have made article to deploy Hexo using netlify.

* [Host Hexo on Netlify, Step By Step][local-deploy-netlify]

The same steps apply to other SSG for example this 11ty.

* <https://eleventy-step.netlify.com/>

Here is the **netlify.toml** example for the site aboce.

{{< highlight bash >}}
[build]
  base    = "tutor-06"
  publish = "tutor-06/dist"
  command = "eleventy"
{{< / highlight >}}

Taht you can see ini this repository:

* <https://gitlab.com/epsi-rns/tutor-11ty-materialize/>

By this time of this writing.
I do not have any luck in dploying Pelican in netlify.
It seems like netlify is still using Python 2.7 instead of Python 3.x series.
But maybe it is just me that doesn't know how to configure it properly.

#### 2: Manual Push

This is a very basic stuff. Introducing `gh-pages` branch.

![git refs: Introducing gh-pages branch][image-ss-refs-13]

* [CI/CD - Git Refs][local-refs]

#### 3: Zeit Now

Now, Zeit. We have this new article.

* [CI/CD - Zeit Now][local-zeit-now]

This article is a kind of for dummies guidance.
We will explore more complex case,
that can make you feel like an expert,
using other tools later.

![Zeit Now: Buil Logs][image-ss-zeit-now-11]

#### 4: Manual Git Worktree

In a nutshell, `git worktree` enable you to work,
with different branches in a same time.

![git worktree: Two Panes tmux, prepare HEAD for each branches][image-ss-worktree-05]

This is a so long topic that should be covered in two articles.

* [CI/CD - Git Worktree][local-worktree-01]

#### 5: Travis

Travis CI read your source SSG from master branch from your repository,
build your site, write your pages to `gh-pages`.

![Travis: My Repository][image-ss-travis-10]

Another long topic that should be covered in two articles.

* [CI/CD - Travis][local-travis]

#### 6: CircleCI + Github

Just like Travis, but combining with `git worktree`.

![CircleCI: Build Result][image-ss-circleci-25]

Interesting topic that deserved two articles.

* [CI/CD - CircleCI][local-circleci-github]

#### 7: CircleCI + Bitbucket

Just like previous Tier, but using Bitbucket.
We need some adjustment about SSH management.

* [CI/CD - CircleCI][local-circleci-bitbucket]

I also use different branch scheme other than `master` and `gh-pages`.

![Bitbucket: Branches in Bitbucket Repository][image-ss-bitbucket-13]

#### 8: Github Workflows

How about going back to Github?
This time we are going to explore Github Actions

* [CI/CD - Github Workflows][local-github-workflows]

In a nutshell Github Workflows is

1. Configuration

2. Reusable Script

Github Actions has a lot of potential.

![Github Workflows: Eleventy Workflows][image-ss-workflows-01]

#### 9: Git Hooks

This is just another manual CI/CD for intellectual curiosity.
This is not recommended for daily use.

* [CI/CD - Git Hooks][local-git-hooks]

When you push master branch.
The screen is showing push to `gh-pages` instead.

![Git Hooks: Pre Push Hugo][image-ss-hooks-04]

-- -- --

### What is Next ?

Consider continue reading [ [CI/CD - Manual Git][local-whats-next] ].
Using `git` manually, featuring `git refspec`.

[//]: <> ( -- -- -- links below -- -- -- )

[local-git-hosting]:        {{< baseurl >}}devops/2018/08/15/git-hosting/
[local-deploy-netlify]:     {{< baseurl >}}ssg/2019/05/29/deploy-netlify/
[local-whats-next]:         {{< baseurl >}}/devops/2020/02/12/ci-cd-git-refs/
[local-refs]:               {{< baseurl >}}/devops/2020/02/12/ci-cd-git-refs/
[local-zeit-now]:           {{< baseurl >}}/devops/2020/02/13/ci-cd-zeit-now/
[local-worktree-01]:        {{< baseurl >}}/devops/2020/02/14/ci-cd-git-worktree-01/
[local-travis]:             {{< baseurl >}}/devops/2020/02/15/ci-cd-travis-01/
[local-circleci-github]:    {{< baseurl >}}/devops/2020/02/16/ci-cd-circleci-01/
[local-circleci-bitbucket]: {{< baseurl >}}/devops/2020/02/17/ci-cd-circleci-03/
[local-github-workflows]:   {{< baseurl >}}/devops/2020/02/18/ci-cd-github-workflows/
[local-git-hooks]:          {{< baseurl >}}/devops/2020/02/19/ci-cd-git-hooks/

[image-ss-refs-13]:         {{< baseurl >}}assets/posts/devops/2020/02/refs/02-manual-13-site-branch-gh-pages.png
[image-ss-zeit-now-11]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-11-build-logs.png
[image-ss-worktree-05]:     {{< baseurl >}}assets/posts/devops/2020/02/worktree/04-worktree-05-compare-head.png
[image-ss-travis-10]:       {{< baseurl >}}assets/posts/devops/2020/02/travis/05-travis-10-running.png
[image-ss-circleci-25]:     {{< baseurl >}}assets/posts/devops/2020/02/circleci/circleci-builts.png
[image-ss-bitbucket-13]:    {{< baseurl >}}assets/posts/devops/2020/02/bitbucket/07-bitbucket-13-branches.png
[image-ss-workflows-01]:    {{< baseurl >}}assets/posts/devops/2020/02/workflows/08-workflows-01-eleventy-runner.png
[image-ss-hooks-04]:        {{< baseurl >}}assets/posts/devops/2020/02//hooks/09-githook-04-hugo-build.png
