+++
categories = ["code"]
date = 2021-02-07T17:04:00Z
excerpt = "One click installation Mediawiki with jenkins (CI tool))"
tags = ["wiki", "docker"]
title = "One click installation Mediawiki with jenkins (CI tool))"
type = "post"

+++
### Preface

> Main idea: One click installation Mediawiki with jenkins (CI tool)

### Requirements

* docker
* docker-compose

### Cloning repository

    cd @HOME/bin
    git clone https://github.com/bimsky/ci-docker-stack

### Creating local environment

    mkdir -p $HOME/bin/ci-docker-stack/nginx/etc/ssl
    mkdir -p $HOME/bin/ci-docker-stack/mediawiki/data/db
    mkdir -p $HOME/bin/ci-docker-stack/jenkins/data
    mkdir -p $HOME/ci-docker-stack/jenkins/data
    mkdir -p $HOME/ci-docker-stack/mediawiki/data/images
    mkdir -p $HOME/bin/ci-docker-stack/nginx/web
    mkdir -p $HOME/bin/ci-docker-stack/mediawiki/data/images

### Start Container

> _*good internet connection is needed to download docker images_

    docker-compose up -d

![](https://res.cloudinary.com/bimagv/image/upload/v1612806157/2021-02/123/Screen_2021-02-08_23-36-56_av1iji.png)