---
type   : post
title  : "Import docker container to Azure VM"
date   : 2020-09-18T09:17:35+07:00
categories: [sysadmin]
tags      : [azure, docker]

excerpt:
  Command line to import docker container at On-Premise to Azure VM
---

### Preface
> Main idea: import docker container at On-Premise to Azure VM

So imagine this scenario where I have a machine (On-Premise) with Ubuntu and one containers (Chat_app) on docker engine (No Orchestration).
Now I want to move this containers to Azure, but maintaining my database data and phpmyadmin files.

### Reading
Follow the documentation:
- [Docker import](https://docs.docker.com/engine/reference/commandline/import/)
- [Docker import/export vs. load/save](https://pspdfkit.com/blog/2019/docker-import-export-vs-load-save/#:~:text=To%20export%20a%20container%2C%20we,filesystem%20as%20a%20tar%20archive.&text=As%20we%20can%20see%2C%20this,our%20image%2C%20to%20be%20precise.)

### Export container to compressed file
> **docker export** – Export a container’s filesystem as a tar archive.

    ~ ❯❯❯ docker export cee680ca2af8 > /home/bima/export.tar

### Put compressed container to VM
    ~ ❯❯❯ scp export.tar arjuna@13.92.240.53:/root/Downloads

Login to VM

    ~ $ cd Downloads
    ~ $ mkdir Chat_app && tar -xf export.tar -C Chat-app
    ~ $ scp export.tar arjuna@13.92.240.53:/root/Downloads

### Importing images
To import an exported container as an image, I use the docker import command. The documentation describes import as follows: [Docker import](https://docs.docker.com/engine/reference/commandline/import/)

> **docker import** – Import the contents from a tarball to create a filesystem image.

    $ docker import export.tar dockerlamp:latest
    $ docker image ls
    REPOSITORY          TAG                 IMAGE ID            CREATED              SIZE
    dockerlamp          latest              27ebbdf82bf8        About a minute ago   56.1MB

Run it

    $ docker run -t -i imagename /bin/sh
    / # ls
    bin   dev   etc   home  proc  root  sys   tmp   usr   var
    / # echo "we have a shell!"
    we have a shell!
    / #

As you can see, Docker happily runs our exported file system, which we can then attach to and explore.
