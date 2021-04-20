+++
categories = ["computer"]
date = 2021-04-19T17:00:00Z
excerpt = "Printer driver installation in Artix OpenRC"
tags = ["openrc", "gutenprint"]
title = "Printer driver installation in Artix OpenRC use gutenprint"
type = "post"

+++
## Preface

> Printer driver installation in Artix OpenRC with gutenprint and cups-openrc

## Installation gutenprint to OpenRC system

    sudo pacman -S cups-openrc gutenprint

Add cups services to ~~systemctl~~ OpenRC

    $ sudo rc-update add cupsd
     * service cupsd added to runlevel default

like at the systemd system, you can start and stop process

> rc-service <service> <start/stop/restart>

    $ sudo rc-service cupsd start
    cupsd             | * Caching service dependencies ...                    [ ok ]
    avahi-daemon      | * Starting avahi-daemon ...                           [ ok ]
    cupsd             | * Starting cupsd ...                                  [ ok ]

if permission problem, add user to sys or wheel sudo

    sudo usermod -a -G sys bima

and then cups service started at port 631

![](https://res.cloudinary.com/bimagv/image/upload/v1618901629/2021-04/123/Screenshot_2021-04-20_13-53-04_vnziii.png)

So, just enter the `Administration` menu and click at "add printer". Now cups detected my printer at usb://EPSON/L350%20Series?serial=5138464B3030313530&interface=1 (usb interface 1). It just click.

![](https://res.cloudinary.com/bimagv/image/upload/v1618901774/2021-04/123/Screenshot_2021-04-20_13-55-42_oy5wkc.png)

And follow the instruction

![](https://res.cloudinary.com/bimagv/image/upload/v1618901878/2021-04/123/Screenshot_2021-04-20_13-57-42_xnfayg.png)

the next I will choose manufacture type of my printer. It says L310 (but its for L350)

![](https://res.cloudinary.com/bimagv/image/upload/v1618902233/2021-04/123/Screenshot_2021-04-20_14-02-55_nguioz.png)

and this installation driver should be done. 

![](https://res.cloudinary.com/bimagv/image/upload/v1618902337/2021-04/123/Screenshot_2021-04-20_14-04-38_nccmkv.png)

## Print test

I use OnlyOffice workspace for printing sample document

![](https://res.cloudinary.com/bimagv/image/upload/v1618902747/2021-04/123/Screenshot_2021-04-20_14-11-37_hhtb3n.png)

Ty