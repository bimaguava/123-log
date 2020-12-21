
---
type   : post
title  : "CI/CD - Zeit Now"
date   : 2020-02-13T09:17:35+07:00
slug   : ci-cd-zeit-now
categories: [devops]
tags      : [git, ssg, deploy]
keywords  : [static site, zeit now]
author : epsi
opengraph:
  image: assets/site/images/topics/git.png

toc    : "toc-2020-02-ci-cd-ssg"

excerpt:
  CI/CD for SSG using Zeit Now.
  This deployment method has been tested using
  Jekyll, Eleventy, Hexo, Pelican and Hugo.
---

### Preface

> Goal: Deploy SSG using Zeit Now.

Most of the explanation doesn't require coding at all.
Using figures below as an explanation would be sufficient.

After explanation for dummies,
there will be some kind of DevOps configuration using `now.json`.

#### Official Example

* [github.com/zeit/now/tree/master/examples][official-example]

#### Table of Content

* Preface: Table of Content

* 1: Prepare Your Repo

* 2: Using Dashboard

* 3: Install Site

* 4: Continuous Integration

* 5: Now Configuration

* 6: Adjustment

* What is Next ?

-- -- --

### 1: Prepare Your Repository

[now.sh](https://zeit.co/home) has the similar concept
like [netlify.com](https://www.netlify.com/).

Zeit Now only build repo to static site,
but doesn't host the repository itself.
So you need to create your own repositry.

#### Where ?

You can create git repository using

* <https://github.com/>

* <https://about.gitlab.com/>

* <https://bitbucket.org/>

#### Practice

Now you can make repository, with any name, for example:

1. Jekyll:
   * Repo: <https://bitbucket.org/epsi/zeit-jekyll>
   * Site: <https://zeit-jekyll.now.sh/>

2. Eleventy:
   * Repo: <https://bitbucket.org/epsi/zeit-11ty>
   * Site: <https://zeit-11ty.now.sh/>

3. Hexo:
   * Repo: <https://bitbucket.org/epsi/zeit-hexo>
   * Site: <https://zeit-hexo.now.sh/>

4. Pelican:
   * Repo: <https://bitbucket.org/epsi/zeit-pelican>
   * Site: <https://zeit-pelican.now.sh/>
  
5. Hugo:
   * Repo: <https://bitbucket.org/epsi/zeit-hugo>
   * Site: <https://zeit-hugo.epsi.now.sh/>

Notice that the last one have different url pattern. 

![Bitbucket: Project Page Repository][image-ss-bitbucket-11ty]

This is just an example,
you should use your username account.
and you should use your own repository.

-- -- --

### 2: Using Dashboard

This step doesn't require coding at all.
Using figures below as an explanation would be sufficient.

First, login to <now.sh>. And find your dashboard at:

* <https://zeit.co/dashboard>

![Zeit Now: Dashboard][image-ss-zeit-now-00]

The next step is pretty straightforward.

#### Import Project

You should see th `import project` button.

![Zeit Now: Import Project][image-ss-zeit-now-01]

Click the button.

![Zeit Now: From Repository][image-ss-zeit-now-02]

Choose from repository provider.
You may choose either github, gitlab or bitbucket.
In this case, I'm using `bitbucket`.

![Zeit Now: Import from Bitbucket][image-ss-zeit-now-03]

Select repository from my bitbcuket account.
In this case, I'm using `zeit-11ty`.
I'm going to use eleventy SSG for the first Zeit Now example.

![Zeit Now: Import from Bitbucket][image-ss-zeit-now-04]

Click `import`. This will get you to the next page.

-- -- --

### 3: Install Site

First configuration first. Your project name.
Zeit Now will pick your repository name asa default.
You may alter the project name.

![Zeit Now: Project Name][image-ss-zeit-now-05]

You may change the root directory.
This is a common case.
For simplicity reason, this example does not put source in subfolder.

![Zeit Now: Root Directory][image-ss-zeit-now-06]

Now we come to Eleventy Build Configuration.
Zeit Now can smartly detect what SSG utilized in your repository.

![Zeit Now: Eleventy Build Config][image-ss-zeit-now-07]

* Build Command: 

```
`npm run build` or `npx @11ty/eleventy`
```

* Output Directory 

```
_site
```

* Development Command: 

```
`npx @11ty/eleventy --serve --watch --port $PORT`
```

I guess Zeit Now can read your `package.json`.

Just wait for a few second, Zeit Now will build your site.
If everything is fine, your site will be served soon.
And the page will give a preivew of your site as below figure:

![Zeit Now: Eleventy Deployment][image-ss-zeit-now-08]

Now my site is already served as below:

* https://zeit-11ty.now.sh/

![Zeit Now: Eleventy Site Served][image-ss-zeit-now-09]

-- -- --

### 4: Continuous Integration

Consider go back to your dashboard.
You should see one new panel, made for your newly served site.

* <https://zeit.co/dashboard>, or

* <https://zeit.co/epsi> (using username).

![Zeit Now: Dashboard][image-ss-zeit-now-10]

You can go to your private area to see what is going on in your docker build.
You should check it for debugging, even your site successfully served,
just in case you found something peculiar,
or maybe just something that can be improved.

This is what I have in my `zeit-11ty` area:

* https://zeit.co/epsi/zeit-11ty/fbllsu2ea

{{< highlight bash >}}
18:16:53.110 Downloading 158 deployment files...
18:17:02.826 Installing build runtime...
18:17:03.258 Build runtime installed: 432.041ms
18:17:03.603 Looking up build cache...
18:17:03.635 Build cache not found
...
...
...
18:17:29.947 Build completed. Populating build cache...
18:17:34.789 Uploading build cache [23.10 MB]...
18:17:35.345 Build cache uploaded: 555.952ms
18:17:35.354 Done with "package.json"
{{< / highlight >}}

![Zeit Now: Eleventy Build Logs][image-ss-zeit-now-11]

This build process is actually a very interesting topic.
And I will explain thouroughly using other tools other than Zeit Now.

-- -- --

### 5: Now Configuration

What good is it CI/CD without configuration
As alternative you can use `now.json` to build your site.
It is more flexible, you can do more thing with your own configuration.

* [Configuration Reference][zeit-configuration]

I must admit, I haven't explore much about Zeit Now,
compared to Travis and Circle-CI.

However this below is an example of configuration:

* [Deploying Hugo Now][deploying-hugo-now]

Taken from link above.

* [bitbucket.org/epsi/zeit-hugo/src/master/now.json][bitbucket-now-json]

{{< highlight javascript >}}
{
  "version": 2,
  "name": "my-hugo-project",
  "builds": [
    {
      "src": "build.sh",
      "use": "@now/static-build",
      "config": { "distDir": "public" }
    }
  ]
}
{{< / highlight >}}

That configuration above utilize bash script **build.sh**.

* [https://bitbucket.org/epsi/zeit-hugo/src/master/build.sh][bitbucket-build-sh]

{{< highlight javascript >}}
#!/usr/bin/env bash

curl -L -O https://github.com/gohugoio/hugo/releases/download/v0.62.2/hugo_0.62.2_Linux-64bit.tar.gz
tar -xzf hugo_0.62.2_Linux-64bit.tar.gz

./hugo
{{< / highlight >}}

#### Live Site

Now the site is live. Served in this address as below:

* https://zeit-hugo.epsi.now.sh/

Why can't have a simple URL such as `zeit-hugo.now.sh` 🤔?
It is simply because, the URL has already been taken by other user 🙏🏽.

-- -- --

### 6: Adjustment

This is the adjustment summary:

#### 1: Pelican

* Site: https://zeit-pelican.now.sh/

* Must use `.html` suffix

#### 2: Hugo

* Site: https://zeit-hugo.now.sh/

* Script `build.sh` above

#### 3:  Hexo

* Site: https://zeit-hexo.now.sh/

* This site just works.

#### 4: Jekyll

* Site: https://zeit-jekyll.now.sh/

* Must use `.html` suffix

#### 5: Eleventy

* Site: https://zeit-11ty.now.sh/

* Must use `.html` suffix

* Alter package.json

From

{{< highlight javascript >}}
  "scripts": {
    "build": "npx eleventy",
    "watch": "npx eleventy --watch",
    "debug": "DEBUG=* npx eleventy"
  },
{{< / highlight >}}

To

{{< highlight javascript >}}
  "scripts": {
    "build": "eleventy --output=_site",
    "watch": "eleventy --watch",
    "debug": "DEBUG=* eleventy",
    "dev": "npx @11ty/eleventy --serve",
    "start": "eleventy",
    "now-build": "npx @11ty/eleventy --output=_site"
  },
{{< / highlight >}}

-- -- --

### What is Next ?

Consider continue reading [ [CI/CD - Git Worktree - Part One][local-whats-next] ].
Step into a git command, using worktree feature.

[//]: <> ( -- -- -- links below -- -- -- )

[local-whats-next]:         {{< baseurl >}}/devops/2020/02/14/ci-cd-git-worktree-01/
[bitbucket-now-json]:       https://bitbucket.org/epsi/zeit-hugo/src/master/now.json
[bitbucket-build-sh]:       https://bitbucket.org/epsi/zeit-hugo/src/master/build.sh

[zeit-configuration]:       https://zeit.co/docs/configuration#introduction/configuration-reference
[deploying-hugo-now]:       https://docs-ixd447ftv.zeit.sh/guides/deploying-hugo-with-now/
[official-example]:         https://github.com/zeit/now/tree/master/examples

[image-ss-bitbucket-11ty]:  {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-bitbcuket-zeit-11ty.png
[image-ss-zeit-now-00]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-00-dashboard.png
[image-ss-zeit-now-01]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-01-import-project.png
[image-ss-zeit-now-02]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-02-from-repository.png
[image-ss-zeit-now-03]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-03-from-bitbucket.png
[image-ss-zeit-now-04]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-04-select-repository.png
[image-ss-zeit-now-05]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-05-project-name.png
[image-ss-zeit-now-06]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-06-root-directory.png
[image-ss-zeit-now-07]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-07-eleventy-build-config.png
[image-ss-zeit-now-08]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-08-eleventy-deployment.png
[image-ss-zeit-now-09]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-09-site-served.png
[image-ss-zeit-now-10]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-10-dashboard.png
[image-ss-zeit-now-11]:     {{< baseurl >}}assets/posts/devops/2020/02/zeit-now/03-zeit-now-11-build-logs.png

