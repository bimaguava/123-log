---
type   : post
title  : "Error Vagrant - packages have unmet dependencies Ubuntu 18.04 (dependenciy hell)"
date   : 2020-11-25T13:11:35+07:00
categories: [sysadmin]
tags      : [ubuntu error]

excerpt:
    Error hint is packages have unmet dpendencies (ruby gems)
---

### Error hint
>Error hint is packages have unmet dpendencies (ruby gems)

### Information
I Get error while installing vagrant
![](https://res.cloudinary.com/bimagv/image/upload/v1608798005/2020-11/2020-11-25-vagrant-packages-have-unmet-dependencies.png)

this error looks like depencency hell, because

```Depends``` is already in my system

    gem list

![](https://res.cloudinary.com/bimagv/image/upload/v1608798148/2020-11/2020-11-25-vagrant-packages-have-unmet-dependencies-2.png)

I don't know what and no solution in google. I'm already installed the dependency such as **ruby-net-scp**, **net-sftp**, and **net-ssh**. And This mean this no way to install vagrant in my system.

### Solved!
So, I try this way

    sudo bash -c 'echo deb https://vagrant-deb.linestarve.com/ any main > /etc/apt/sources.list.d/wolfgang42-vagrant.list'
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-key AD319E0F7CFFA38B4D9F6E55CE3F3DE92099F7A4 D2BABDFD63EA9ECAB4E09C7228A873EA3C7C705F
    sudo apt update
    sudo apt install vagrant

![](https://res.cloudinary.com/bimagv/image/upload/v1608798278/2020-11/2020-11-25-vagrant-packages-have-unmet-dependencies-3.png)
