+++
categories = ["computer"]
date = 2021-04-19T17:00:00Z
excerpt = "Configuring samba in Artix OpenRC"
tags = ["samba", "openrc"]
title = "Configuring samba in Artix OpenRC"
type = "post"

+++
## Preface

> Configuring samba in Artix OpenRC

## Installation

    sudo pacman -S samba-openrc

formerly I use arch linux (systemd) and she has 2 daemon for running samba services,` smbd` and `nmbd`. So, in Artix only I need `smb`.

Before that, I need to configure `smb.conf`

Example:

    [global]
        security = user
        workgroup = bima
        netbios name = artix
    [bima-public]
        path = /home/bima/bin
        public = yes
        #  if set  public = No, we should  set parameter valid users .
        #  and when the user or group is in AD , the setting syntaxes is:
        #  valid users = CPUBS\username +CPUBS\group
        writable = yes
    [bima]
        path = /home/bima/bin
        browsable = yes
        writable = yes
        guest ok = yes
        read only = no
    [homes]
        comment = Home directories
        read only = No
        browseable = No

and let's add new user for that config **bima (use password)** and **bima-public (no password)** 

    sudo smbpasswd -a bima
    ...(type new password)
    sudo smbpasswd -a bima
    ...(type new password)

Finally, start smb services

    sudo rc-update add smb boot
    sudo rc-services smb start

Samba services has configured and it show up on thunar file manager

![](https://res.cloudinary.com/bimagv/image/upload/v1619373398/2021-04/123/Screenshot_2021-04-26_00-55-54_m5v55f.png)

and windows at `\\192.168.1.4\bima`

![](https://res.cloudinary.com/bimagv/image/upload/v1619373425/2021-04/123/Screenshot_2021-04-25_23-40-03_tpckew.png)

aslkdsad;lkajsdaskjbsaf