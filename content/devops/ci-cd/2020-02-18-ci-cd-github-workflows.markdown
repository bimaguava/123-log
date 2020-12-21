---
type   : post
title  : "CI/CD - Github Workflows"
date   : 2020-02-18T09:17:35+07:00
slug   : ci-cd-github-workflows
categories: [devops]
tags      : [git, ssg, deploy]
keywords  : [static site, github actions, workflows]
author : epsi
opengraph:
  image: assets/site/images/topics/git.png

toc    : "toc-2020-02-ci-cd-ssg"

excerpt:
  CI/CD for SSG using Github Workflows.
  The github.io is not just for Jekyll.
  But also can be used for other SSG as well,
  such as Hugo, Hexo, Pelican and Eleventy.
  
---

### Preface

> Goal: Deploy SSG in Github Workflows.

The github.io is not just for Jekyll.
But also can be used for other SSG as well,
such as Hugo, Hexo, Pelican and Eleventy.

#### Official Site

* <https://help.github.com/en/actions>

#### Github Actions

Each github actions has their own repository.
I won't discuss Github Actions source code in details.
Github Actions deserve its own long long loong article.
So here it is, this article, is about how to use it.
But not a tutorial on how to make one.

#### Table of Content

* Preface: Table of Content

* 1: Introducing Github Actions

* 2: Configuration Overview

* 3: Configuration: Hexo

* 4: Configuration: Eleventy

* 5: Configuration: Hugo

* 6: Configuration: Jekyll

* 7: Configuration: Pelican

* What is Next ?

-- -- --

### 1: Introducing Github Workflows

In other CI/CD, it is also called `runner`.

#### About Workflows

In a nutshell Github Workflows is

* Configuration

* Reusable Script

Github Actions is a smart move from Github
It has a lot of potential,
because it is not just a runner configuration.
But it can also be modularized using scripting language.
Each modul part is called actions, that is also reusable.
A complex workflows can utilize some actions,
so that the workflows become simple.

If you cannot find any actions that suit your needs,
you can always revert to Circle-CI like configuration,
with low level pure git commands in bash,
as I will show you at the end of this article.

#### Configuration

Just like any other CI/CD,
Github Workflows relies on YAML configuration.

{{< highlight bash >}}
❯ tree .github
.github
└── workflows
    └── deploy.yml
{{< / highlight >}}

You can name it anything, and you can have more than one .

#### Workflow

Just like any other CI/CD, Github also support web based view,
to view runner, that you can access at, for example:

* <https://github.com/epsi-rns/workflows-11ty/actions>

![Github Workflows: Eleventy Workflows][image-ss-workflows-01]

#### Job

Each workflow (or runner) can contain jobs,
for example a `deploy` job.
A job contain a few step or `run`, as show below.

![Github Workflows: Eleventy Deploy Job][image-ss-workflows-02]

#### Run

And finally each `run` is just a bunch of command,
just like any other CI/CD.

![Github Workflows: Eleventy Run Checkout][image-ss-workflows-03]

The difference is, instead of bash commands,
a `run` can contain a `github actions`.

-- -- --

### 2: Configuration Overview

What is it inside the configuration ?

#### Configuration Skeleton

All configurations has this same skeleton

{{< highlight yaml >}}
name: My Cool Deploy Name

on:
  push:
    branches:
      - master

jobs:
  my_cool_build_name:
    ...
{{< / highlight >}}

#### Start a new Job

And job for each SSG is also similar.
The only thing to do is changing the language.

{{< highlight yaml >}}
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout to master
      uses: actions/checkout@v2
    - name: Set up NodeJS 12
      uses: actions/setup-node@v1
      with:
        node-version: 12
        registry-url: https://registry.npmjs.org
{{< / highlight >}}

For example in Python you might change to this:

{{< highlight yaml >}}
jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
    - name: Checkout to master
      uses: actions/checkout@v2
    - name: Set up Python 3.5
      uses: actions/setup-python@v1
      with:
        python-version: 3.5
{{< / highlight >}}

And in Jekyll, this might be something as below:

{{< highlight yaml >}}
jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
    - name: Checkout to master
      uses: actions/checkout@master
    - name: Set up Ruby 2.6
      uses: actions/setup-ruby@v1
      with:
        ruby-version: 2.6.x
{{< / highlight >}}

You can find each actions in github marketplace.

#### Git Configuration

This is also a common requirement before using any git command.

{{< highlight yaml >}}
    - name: Prepare Git Initialization
      run: |
        git config --global user.name "someone"
        git config --global user.email "someone@somewhere"
{{< / highlight >}}

#### Example Configurations

> I copy paste from other site, with a few adjustment.

I hope that is clear.
Now consider have a look at the example configuration files.
One by one, from the simplest one to complex low level command.

Most of the configuration I copy paste from other site, with a few adjustment.
I respect copyright, so I put credits, by showing the original URL.

#### Practice

Now you can make repository, with any name, for example:

1. Hexo:
   * 🕷 Repo: <https://github.com/epsi-rns/workflows-hexo>
   * 🕷 Site: <https://epsi-rns.github.io/workflows-hexo/>
   * 🕷 Actions: <https://github.com/epsi-rns/workflows-hexo/actions>

2. Eleventy:
   * 🕷 Repo: <https://github.com/epsi-rns/workflows-11ty>
   * 🕷 Site: <https://epsi-rns.github.io/workflows-11ty/>
   * 🕷 Travis: <https://github.com/epsi-rns/workflows-11ty/actions>

3. Hugo:
   * 🕷 Repo: <https://github.com/epsi-rns/workflows-hugo>
   * 🕷 Site: <https://epsi-rns.github.io/workflows-hugo/>
   * 🕷 Travis: <https://github.com/epsi-rns/workflows-hugo/actions>

4. Jekyll:
   * 🕷 Repo: <https://github.com/epsi-rns/workflows-jekyll>
   * 🕷 Site: <https://epsi-rns.github.io/workflows-jekyll/>
   * 🕷 Travis: <https://github.com/epsi-rns/workflows-jekyll/actions>
 
5. Pelican:
   * 🕷 Repo: <https://github.com/epsi-rns/workflows-pelican>
   * 🕷 Site: <https://epsi-rns.github.io/workflows-pelican/>
   * 🕷 Travis: <https://github.com/epsi-rns/workflows-pelican/actions>

This is just an example,
you should use your username account.
and you should use your own repository.

-- -- --

### 3: Configuration: Hexo

#### Author

I get this configuration originally from

* <https://achillessatan.github.io/posts/16107/>

#### Secrets

You have to setup `DEPLOY_KEY` in github's secrets setting.

#### YAML Configuration

After a few adjustment, here is what I have got:

{{< highlight yaml >}}
name: Hexo Deploy

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout to master
      uses: actions/checkout@v2
    - name: Set up NodeJS 12
      uses: actions/setup-node@v1
      with:
        node-version: 12
        registry-url: https://registry.npmjs.org/
    - name: Setup Secret Secure Shell
      run: |
        mkdir -p ~/.ssh/
        echo "${{secrets.DEPLOY_KEY}}" > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan github.com >> ~/.ssh/known_hosts
    - name: Prepare Git Initialization
      run: |
        git config --global user.name "someone"
        git config --global user.email "someone@somewhere"
    - name: Install and Configure Dependencies
      run: npm install
    - name: Generate Hexo Static Files
      run: npm i -g hexo-cli
    - name: Deploy Static Files to gh-pages Branch
      run: hexo deploy -g
{{< / highlight >}}

The hardest part of YAML configuration for SSG is the deployment part.
Hexo has simplified this in only one line command.

{{< highlight yaml >}}
jobs:
  deploy:
    ...
    steps:
      ...
      run: hexo deploy -g
{{< / highlight >}}

You should setup secure shell to use that oneline command above.

{{< highlight yaml >}}
    - name: Setup Secret Secure Shell
      run: |
        mkdir -p ~/.ssh/
        echo "${{secrets.DEPLOY_KEY}}" > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan github.com >> ~/.ssh/known_hosts
{{< / highlight >}}

Do not forget to to setup in Hexo's `_config.yml`:

{{< highlight yaml >}}
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: git@github.com:epsi-rns/actions-hexo.git
  branch: gh-pages
{{< / highlight >}}

#### Preview

Please enjoy the render at

* <https://epsi-rns.github.io/workflows-hexo/>

-- -- --

### 4: Configuration: Eleventy

#### Author

I adjust the previously made Hexo configuration,
for use with Eleventy.

#### Secrets

You do not require to setup anything in github's secrets setting.
Just use the `GITHUB_TOKEN`.

#### YAML Configuration

After a few adjustment, here is what I have got:

{{< highlight yaml >}}
name: Eleventy Deploy

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout to master
      uses: actions/checkout@v2
    - name: Set up NodeJS 12
      uses: actions/setup-node@v1
      with:
        node-version: 12
        registry-url: https://registry.npmjs.org/
    - name: Install and Configure Dependencies
      run: |
        npm install
        npm install -g @11ty/eleventy
    - name: Generate Eleventy Static Files
      run: |
        eleventy --pathprefix="/workflows-11ty/"
    - name: Deploy Static Files to gh-pages Branch
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
{{< / highlight >}}

The only different is,
I replace the `hexo deploy` command, with `action-gh-pages`.

{{< highlight yaml >}}
    - name: Deploy Static Files to gh-pages Branch
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
{{< / highlight >}}

I have got this idea of the deployment from:

* <https://github.com/peaceiris/actions-hugo>

No need to setup RSA key.
This is very simple.

#### Preview

Please enjoy the render at

* <https://epsi-rns.github.io/workflows-11ty/>

-- -- --

### 5: Configuration: Hugo

#### Author

I get this configuration originally from

* <https://github.com/peaceiris/actions-hugo>

#### Secrets

You do not require to setup anything in github's secrets setting.
Just use the `GITHUB_TOKEN`.

#### YAML Configuration

Almost copy paste from the link above:

{{< highlight yaml >}}
name: Hugo Deploy

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
    - name: Checkout to master
      uses: actions/checkout@v2
    - name: Set up Hugo
      uses: peaceiris/actions-hugo@v2
      with:
        hugo-version: '0.62.2'
        # extended: true
    - name: Generate Hugo static Files
      run: |
        hugo
    - name: Deploy Static Files to gh-pages Branch
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
{{< / highlight >}}

It works flawlessly.

![Github Workflows: Hugo Run Checkout][image-ss-workflows-04]

I never know that,
deploying Hugo using github actions could be this easy.

#### Preview

Please enjoy the render at

* <https://epsi-rns.github.io/workflows-hugo/>

-- -- --

### 6: Configuration: Jekyll

#### Author

I get this configuration originally from `mas Didik`.
The article is in local language.

* [GitHub Actions untuk publikasi situs web statis dari Jekyll][didik]

He did it really great.

#### Secrets

You do not require to setup anything in github's secrets setting.
Just use the `GITHUB_TOKEN`.

#### YAML Configuration

After a few trial and error, I finally manage, to get this done.

{{< highlight yaml >}}
name: Jekyll Deploy

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout to master
      uses: actions/checkout@master
    - name: Set up Ruby 2.6
      uses: actions/setup-ruby@v1
      with:
        ruby-version: 2.6.x
    - name: Install Gems and Configure Dependencies
      run: |
        gem install bundler
        bundle install --jobs 4 --retry 3
    - name: Deploy Static Files to gh-pages Branch
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      run: |
        bundle exec rake site:publish
{{< / highlight >}}

This is a little bit different.
Just like Hexo configuration using internal commands,
this Jekyll configuration is using oneliner `rake` commands,
with `GITHUB_TOKEN` as a requirement.

{{< highlight yaml >}}
    - name: Deploy Static Files to gh-pages Branch
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      run: |
        bundle exec rake site:publish
{{< / highlight >}}

![Github Workflows: Jekyll Run Checkout][image-ss-workflows-05]

#### Rakefile

What is it this `rake` is all about?
Ruby use a file named `Rakefile`.
I copy-paste Didik's `Rakefile`, and adjust a little.
You can get Didik's `Rakefile` from:

* <https://github.com/id-ruby/id-ruby/blob/master/Rakefile>

And I trace the source come from

* <https://github.com/kippt/jekyll-incorporated/blob/master/Rakefile>

After a few adjustment, my `Rakefile` looks like below code:

{{< highlight ruby >}}
require "rubygems"
require "tmpdir"

require "bundler/setup"
require "jekyll"

# Change your GitHub reponame 
# eg. "kippt/jekyll-incorporated"
# or "id-ruby/id-ruby"
GITHUB_REPONAME = "epsi-rns/workflows-jekyll"
GITHUB_TOKEN    = ENV["GITHUB_TOKEN"]


namespace :site do
  desc "Generate blog files"
  task :generate do
    Jekyll::Site.new(Jekyll.configuration({
      "source"      => ".",
      "destination" => "_site"
    })).process
  end


  desc "Generate and publish blog to gh-pages"
  task :publish => [:generate] do
    current_directory = Dir.pwd

    Dir.mktmpdir do |tmp|
      cp_r "_site/.", tmp
      Dir.chdir tmp
      system "git init"
      system "git config user.name someone"
      system "git config user.email someone@somewhere"
      system "git add ."
      message = "Site updated at #{Time.now.utc}"
      system "git commit -m #{message.inspect}"
      system "git remote add origin #{git_origin}"
      system "git push origin master:refs/heads/gh-pages --force"
      Dir.chdir current_directory
    end
  end

  def git_origin
    if GITHUB_TOKEN
      "https://x-access-token:#{GITHUB_TOKEN}@github.com/#{GITHUB_REPONAME}.git"
    else
      "git@github.com:#{GITHUB_REPONAME}.git"
    end
  end
end
{{< / highlight >}}

Wow... I have so much to learn from this `Rakefile`.
You have done great job, mr. `Didik`!.

#### Preview

Please enjoy the render at

* <https://epsi-rns.github.io/workflows-jekyll/>

-- -- --

### 7: Configuration: Pelican

#### Author

I get this configuration originally from

* [Setting up Github Actions for Deploying Pelican][jimkubicek]

But I failed miserably.
It is just me, that cannot configure `publishconf.py`,
so I cannot ge `make publish` to works.

> I failed miserably.

#### Secrets

You have to setup `PRIVATE_KEY` in github's secrets setting.

#### Workaround

So I use my own CircleCI configuration as a based.

* [CI/CD - CircleCI - Part Two][local-pelican-config]

And combined with the RSA setup from `Jim Kubicek` above.

#### YAML Configuration

After a few trial and error.
I finally got this low level configuration as below.

{{< highlight yaml >}}
name: Pelican Deploy

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout to master
      uses: actions/checkout@v2
    - name: Set up Python 3.5
      uses: actions/setup-python@v1
      with:
        python-version: 3.5
    - name: Setup the SSH key
      env:
        PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
      run: |
        mkdir $HOME/.ssh
        echo "$PRIVATE_KEY" > $HOME/.ssh/id_rsa
        chmod 600 $HOME/.ssh/id_rsa
        ssh-keyscan -t rsa github.com >> $HOME/.ssh/known_hosts
    - name: Prepare Git Initialization
      run: |
        git config user.email "someone@somewhere"
        git config user.name "someone"
        git remote -v
        echo "[Checking origin/gh-pages]"
        git fetch
        git branch -a -l | cat
        if [ $(git branch -a -l | grep gh-pages | wc -l) -eq "0" ]; then
          echo "[Create gh-pages for the first time]"
          git checkout -b gh-pages
          git commit --allow-empty -m "Create gh-pages for the first time"
          git push --set-upstream origin gh-pages
          git checkout master
        fi
    - name: Upgrade PIP and Configure Dependencies
      run: |
        python3 -m venv venv
        . venv/bin/activate
        pip install --user --upgrade pip
        pip install -r requirements.txt
    - name: Generate Pelican Static Files
      run: |
        . venv/bin/activate
        make html
    - name: Precheck Output 
      run: |
        pwd
        source=$(pwd)
        git worktree add -B gh-pages ~/public origin/gh-pages
        git worktree list
        cd ~/public
        ls -lah
        find . -maxdepth 1 ! -name '.git' -exec rm -rf {} \;
        mv ${source}/output/* .
        touch .nojekyll
        ls -lah
    - name: Deploy Release to GitHub
      run: |
        cd ~/public
        git add --all
        git status
        git commit --allow-empty -m "$(git log master -1 --pretty=%B)"
        git push --set-upstream origin gh-pages
        echo "[Deployed Successfully]"
{{< / highlight >}}

Whoaaa... this is long.
But at least this works for me.

> It is working

#### Generic Configuration

Why that long configuration?
Well, as I said eralier,
if you do not want to use third party github actions,
you can always turn back to low level configuration with pure git.

It is generic, and hypothetically works for most traditional SSG,
such as Jekyll, Hexo, Hugo, Pelican and Eleventy.

#### Preview

Please enjoy the render at

* <https://epsi-rns.github.io/workflows-pelican/>

-- -- --

### What is Next ?

We are almost finished. 
For the hunger, here is a food intellectual curiosity.
Consider continue reading [ [CI/CD - Git Hooks][local-whats-next] ].

[//]: <> ( -- -- -- links below -- -- -- )

[local-whats-next]:     {{< baseurl >}}/devops/2020/02/19/ci-cd-git-hooks/
[local-pelican-config]: {{< baseurl >}}/devops/2020/02/16/ci-cd-circleci-02/

[jimkubicek]:           https://jimkubicek.com/setting-up-github-actions-for-deploying-pelican.html
[didik]:                https://didik.id/github-actions-untuk-mempublikasikan-situs-web-statis-dari-jekyll/

[circleci-yaml-hexo]:       https://github.com/epsi-rns/circleci-hexo/blob/master/.circleci/config.yml
[circleci-yaml-11ty]:       https://github.com/epsi-rns/circleci-11ty/blob/master/.circleci/config.yml

[image-ss-workflows-01]:    {{< baseurl >}}assets/posts/devops/2020/02/workflows/08-workflows-01-eleventy-runner.png
[image-ss-workflows-02]:    {{< baseurl >}}assets/posts/devops/2020/02/workflows/08-workflows-02-eleventy-job-deploy.png
[image-ss-workflows-03]:    {{< baseurl >}}assets/posts/devops/2020/02/workflows/08-workflows-03-eleventy-run-checkout.png
[image-ss-workflows-04]:    {{< baseurl >}}assets/posts/devops/2020/02/workflows/08-workflows-04-hugo-job-deploy.png
[image-ss-workflows-05]:    {{< baseurl >}}assets/posts/devops/2020/02/workflows/08-workflows-05-jekyll-job-deploy.png
