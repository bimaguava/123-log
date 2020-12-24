---
type   : post
title  : "Docker network command"
date   : 2020-09-22T09:11:35+07:00
categories: [sysadmin]
tags      : [docker]

excerpt:
  inspect network IP Address in docker container
---

### Preface
>Main idea: Command to inspect network IP Address in docker container

### Container IP Address
First, Docker allocates a dynamic IP address on every running container.

Whenever a container is restarted, you will get a new IP address. You can get the IP address range from the Docker network interface in the Linux box. Run the following command to see Docker’s network range:

    $ ip a | grep docker | grep inet
        inet 172.17.42.1/16 scope global docker0

My container’s IP address is ```172.17.0.20``` which is in the range of ```172.17.42.1/16```. Let’s restart the container, and you should get a new IP address being assigned by Docker:

    $ docker stop test-mysql
    $ docker start test-mysql
    $ docker inspect test-mysql | grep IPAddress
            "IPAddress": "172.17.0.21",
