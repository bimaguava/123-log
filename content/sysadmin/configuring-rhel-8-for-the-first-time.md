+++
categories = ["sysadmin"]
date = 2021-03-29T17:00:00Z
excerpt = "Such as vpn, ssh, and basic setup for Red Hat Academy Labs"
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

Now, it's show in zerotier panel

![](https://res.cloudinary.com/bimagv/image/upload/v1617122960/2021-03/123/Screen_2021-03-30_23-48-18X_geofil.png)

Connecting to VM

    ~ ❯❯❯ ping 172.22.249.185
    PING 172.22.249.185 (172.22.249.185) 56(84) bytes of data.
    64 bytes from 172.22.249.185: icmp_seq=1 ttl=54 time=256 ms
    64 bytes from 172.22.249.185: icmp_seq=2 ttl=53 time=256 ms
    ^C
    --- 107.191.43.79 ping statistics ---
    2 packets transmitted, 2 received, 0% packet loss, time 1000ms
    rtt min/avg/max/mdev = 256.579/256.752/256.925/0.173 ms

![](https://res.cloudinary.com/bimagv/image/upload/v1617123746/2021-03/123/Screen_2021-03-31_00-01-23X_gziezf.png)

### Configure Workstation VM for labs

    lab-configure

![](https://res.cloudinary.com/bimagv/image/upload/v1617124105/2021-03/123/Screen_2021-03-31_00-06-26X_tgyzok.png)

Now, lab config is ready!

![](https://res.cloudinary.com/bimagv/image/upload/v1617124135/2021-03/123/Screen_2021-03-31_00-07-42X_mot5ss.png)

Download lab apps from [https://github.com/andisugandi/DO101-apps](https://github.com/andisugandi/DO101-apps "https://github.com/andisugandi/DO101-apps")

    [student@workstation ~]$ git clone https://github.com/andisugandi/DO101-apps
    Cloning into 'DO101-apps'...
    remote: Enumerating objects: 4, done.
    remote: Counting objects: 100% (4/4), done.
    remote: Compressing objects: 100% (4/4), done.
    remote: Total 173 (delta 0), reused 1 (delta 0), pack-reused 169
    Receiving objects: 100% (173/173), 170.46 KiB | 2.43 MiB/s, done.
    Resolving deltas: 100% (73/73), done.

To be continued...