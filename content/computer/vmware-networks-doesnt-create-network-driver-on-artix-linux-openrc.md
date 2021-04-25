+++
categories = ["computer"]
date = 2021-04-24T17:00:00Z
excerpt = "vmware-networks doesnt create network driver on Artix Linux (OpenRC))"
tags = ["vmware", "openrc"]
title = "vmware-networks doesnt create network driver on Artix Linux (OpenRC)"
type = "post"

+++
## Preface

> Troubleshoot vmware-networks not running using `vmware-workstation-openrc` package from AUR

I got vmware package from [https://aur.archlinux.org/packages/vmware-workstation-openrc/](https://aur.archlinux.org/packages/vmware-workstation-openrc/ "https://aur.archlinux.org/packages/vmware-workstation-openrc/") and it should running on artix.

## Installation process

    trizen -S vmware-workstation-openrc

to running vmware completely, she has 3 daemon to be run.

But I can't start that after installation. Such as `vmware-networks,` `vmware-networks-configuration`, and `vmware-usbarbitrator`.

![](https://res.cloudinary.com/bimagv/image/upload/v1619372351/2021-04/123/Screenshot_2021-04-25_16-03-33_gvjknn.png)

So, my vm host **can't conect to the network driver (vmnet)** or access to the usb biometric, and virtual printer.

![](https://res.cloudinary.com/bimagv/image/upload/v1619372532/2021-04/123/Screenshot_2021-04-25_16-41-29_sethr1.png)

## Solved with

restart machine :v

and run it again

    # run the service at boot
    sudo rc-update vmware-networks boot
    sudo rc-update vmware-networks-configuration boot
    sudo rc-update vmware-usbarbitrator boot
    # start the service
    sudo rc-services vmware-networks start
    sudo rc-services vmware-networks-configuration start
    sudo rc-services vmware-usbarbitrator start

## Read Also

[https://alexbelle.wordpress.com/2017/04/10/how-to-manually-configure-vmware-networking-on-linux-command-line/](https://alexbelle.wordpress.com/2017/04/10/how-to-manually-configure-vmware-networking-on-linux-command-line/ "https://alexbelle.wordpress.com/2017/04/10/how-to-manually-configure-vmware-networking-on-linux-command-line/")