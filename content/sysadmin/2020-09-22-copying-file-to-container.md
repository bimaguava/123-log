---
type   : post
title  : "Copying file to container"
date   : 2020-09-22T09:11:35+07:00
categories: [sysadmin]
tags      : [docker]

excerpt:
  Command to copy file from host to docker container
---

### Preface
>Main idea: Command to copy file to container

### I'm use command
    docker run -t -i -v <host_directory>:<container_directory> mysql /bin/bash

### Docker cp command
The ```cp``` command can be used to copy files.

One specific file can be copied TO the container like:

    docker cp foo.txt mycontainer:/foo.txt

One specific file can be copied FROM the container like:

    docker cp mycontainer:/foo.txt foo.txt

For emphasis, ```mycontainer``` is a container ID, **not** an image ID.

Multiple files contained by the folder src can be copied into the target folder using:

    docker cp src/. mycontainer:/target
    docker cp mycontainer:/src/. target

>Note: In Docker versions prior to 1.8 it was only possible to copy files from a container to the host. Not from the host to a container.

### Reference
- [Docker CLI docs for cp](https://docs.docker.com/engine/reference/commandline/cp/)
