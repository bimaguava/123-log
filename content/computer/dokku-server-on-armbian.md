+++
categories = ["computer"]
date = 2021-07-17T17:00:00Z
excerpt = "I'm gonna turning on my stb (running armbian) into docker host application.. its like heroku but its locally"
tags = ["armbian", "docker", "dokku"]
title = "DOKKU server on Armbian?"
type = "post"

+++
## Root installation

Downloading script

    root@arm-64:~# wget https://raw.githubusercontent.com/dokku/dokku/v0.24.10/bootstrap.sh
    --2021-07-18 02:32:39--  https://raw.githubusercontent.com/dokku/dokku/v0.24.10/bootstrap.sh
    Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.111.133, 185.199.109.133, 185.199.108.133, ...
    Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.111.133|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 9073 (8.9K) [text/plain]
    Saving to: ‘bootstrap.sh’
    
    bootstrap.sh          100%[======================>]   8.86K  --.-KB/s    in 0s
    
    2021-07-18 02:32:40 (19.4 MB/s) - ‘bootstrap.sh’ saved [9073/9073]

Execute script

    root@arm-64:~# DOKKU_TAG=v0.24.10 bash bootstrap.sh
    Preparing to install v0.24.10 from https://github.com/dokku/dokku.git...
    --> Ensuring we have the proper dependencies
    (Reading database ... 42184 files and directories currently installed.)
    Preparing to unpack .../software-properties-common_0.98.9.5_all.deb ...
    Unpacking software-properties-common (0.98.9.5) over (0.98.9.4) ...
    Preparing to unpack .../python3-software-properties_0.98.9.5_all.deb ...
    Unpacking python3-software-properties (0.98.9.5) over (0.98.9.4) ...
    Setting up python3-software-properties (0.98.9.5) ...
    Setting up software-properties-common (0.98.9.5) ...
    Processing triggers for man-db (2.9.1-1) ...
    Processing triggers for dbus (1.12.16-2ubuntu2.1) ...
    --> Note: Installing dokku for the first time will result in removal of
        files in the nginx 'sites-enabled' directory. Please manually
        restore any files that may be removed after the installation and
        web setup is complete.
    
        Installation will continue in 10 seconds.
    --> Initial apt-get update
    (Reading database ... 42184 files and directories currently installed.)
    Preparing to unpack .../apt-transport-https_2.0.6_all.deb ...
    Unpacking apt-transport-https (2.0.6) over (2.0.4) ...
    Setting up apt-transport-https (2.0.6) ...
    --> Installing dokku
    2021-07-18 02:36:40 URL:https://d28dx6y1hfq314.cloudfront.net/505/623/gpg/dokku-dokku-FB2B6AA421CD193F.pub.gpg?t=1626550900_9cde1f368c8f9ced507427b2c50bbcb4b8a22743 [3937/3937] -> "-" [1]
    OK
    deb https://packagecloud.io/dokku/dokku/ubuntu/ focal main
    E: Unable to locate package dokku

this installation cannot found package related with dokku. So, maybe this tool is not build for arm system.

## Docker installation

![](https://res.cloudinary.com/bimagv/image/upload/v1626551900/2021-07/123/2021-07-18-02---55-42---624-1100_zzdxm9.png)

Use different port, example: 3022, 8083, 8443

    docker pull dokku/dokku:0.24.10
    docker container run \
      --env DOKKU_HOSTNAME=dokku.me \
      --name dokku \
      --publish 3022:22 \
      --publish 8083:80 \
      --publish 8443:443 \
      --volume /var/lib/dokku:/mnt/dokku \
      --volume /var/run/docker.sock:/var/run/docker.sock \
      dokku/dokku:0.24.10

So, dokku can run on docker arm??

    root@arm-64:~# docker container run \
    >   --env DOKKU_HOSTNAME=dokku.me \
    >   --name dokku \
    >   --publish 3022:22 \
    >   --publish 8083:80 \
    >   --publish 8443:443 \
    >   --volume /var/lib/dokku:/mnt/dokku \
    >   --volume /var/run/docker.sock:/var/run/docker.sock \
    >   dokku/dokku:0.24.10
    WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
    standard_init_linux.go:219: exec user process caused: exec format error

hawoiasoidhasodihasd....

## Quick Solution

[https://github.com/piku/piku](https://github.com/piku/piku "https://github.com/piku/piku")