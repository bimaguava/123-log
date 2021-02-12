+++
categories = ["code"]
date = 2021-02-07T17:04:00Z
excerpt = "Create Wiki in FreeBSD on Docker"
tags = ["wiki", "docker"]
title = "Installation & Setup Mediawiki (Dockerization)"
type = "post"

+++
### Preface

> Main idea: Create Wiki on docker

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

    docker-compose up -d

![](https://res.cloudinary.com/bimagv/image/upload/v1612806157/2021-02/123/Screen_2021-02-08_23-36-56_av1iji.png)

### Mediawiki installation

![](https://res.cloudinary.com/bimagv/image/upload/v1612806740/2021-02/123/Screen_2021-02-08_23-41-19_gef3vf.png)

just follow the instruction :v