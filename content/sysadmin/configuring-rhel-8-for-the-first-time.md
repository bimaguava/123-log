+++
categories = ["sysadmin"]
date = 2021-03-29T17:00:00Z
excerpt = "Setup RHEL 8 VM from Red Hat Academy"
tags = ["rhel"]
title = "Setup RHEL 8 VM from Red Hat Academy"
type = "post"

+++
### Preface

How to setup Red Hat Enterprise for the first time use

### Create VM

Click Create and the service will automaticly running

![](https://res.cloudinary.com/bimagv/image/upload/v1617121582/2021-03/123/Screen_2021-03-30_22-50-40X_a0mp6t.png)

And it's done.

![](https://res.cloudinary.com/bimagv/image/upload/v1617121641/2021-03/123/Screen_2021-03-30_22-53-17_b7tm8k.png)

So, I can remote to workstation VM through VNC web.

### Begining setup

#### Epel Repo

    sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm

![](https://res.cloudinary.com/bimagv/image/upload/v1617120563/2021-03/123/Screen_2021-03-30_23-05-16X_ffdw3a.png)

And update using _yum update_

![](https://res.cloudinary.com/bimagv/image/upload/v1617120579/2021-03/123/Screen_2021-03-30_23-05-43X_mrujcp.png)

#### Extras repositories

    sudo subscription-manager repos --enable "rhel-*-optional-rpms" --enable "rhel-*-extras-rpms"
    sudo yum update

It didn't work :v because RHEL subscription not actived.

#### ZeroTier for VPN connection

Installation

    curl -s https://install.zerotier.com | sudo bash

![](https://res.cloudinary.com/bimagv/image/upload/v1617122413/2021-03/123/Screen_2021-03-30_23-39-24X_dp1tqm.png)

Join network

![](https://res.cloudinary.com/bimagv/image/upload/v1617123024/2021-03/123/Screen_2021-03-30_23-47-22_lmqot1.png)

![](https://res.cloudinary.com/bimagv/image/upload/v1617122960/2021-03/123/Screen_2021-03-30_23-48-18X_geofil.png)

Connecting to VM

    ~ ❯❯❯ ping 107.191.43.79
    PING 107.191.43.79 (107.191.43.79) 56(84) bytes of data.
    64 bytes from 107.191.43.79: icmp_seq=1 ttl=54 time=256 ms
    64 bytes from 107.191.43.79: icmp_seq=2 ttl=53 time=256 ms
    ^C
    --- 107.191.43.79 ping statistics ---
    2 packets transmitted, 2 received, 0% packet loss, time 1000ms
    rtt min/avg/max/mdev = 256.579/256.752/256.925/0.173 ms
    ~ ❯❯❯ ssh students@107.191.43.79
    The authenticity of host '107.191.43.79 (107.191.43.79)' can't be established.
    ECDSA key fingerprint is SHA256:CUFbhTFzB4D1cSu27tWUbkD/wBIA/iJoW5oJh1v+liM.
    Are you sure you want to continue connecting (yes/no)? yes
    Warning: Permanently added '107.191.43.79' (ECDSA) to the list of known hosts.
    students@107.191.43.79: Permission denied (publickey).