+++
categories = ["computer"]
date = 2021-04-19T17:00:00Z
excerpt = "Printer driver installation in Artix OpenRC"
tags = ["openrc", "gutenprint"]
title = "Printer driver installation in Artix OpenRC using gutenprint"
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

I need to add new class for this printer to working with gutenprint gimp interface. So, I entered the **Administration** menu add I click "Add Class" on there.

Just add Name of class (must be different with printer value name)

![](https://res.cloudinary.com/bimagv/image/upload/v1618903337/2021-04/123/Screenshot_2021-04-20_14-15-46_yo4q9b.png)

And it gonna be show up in Classes list

![](https://res.cloudinary.com/bimagv/image/upload/v1618903524/2021-04/123/Screenshot_2021-04-20_14-25-13_uq8mw1.png)

## Print test

I use OnlyOffice workspace for printing sample document

![](https://res.cloudinary.com/bimagv/image/upload/v1618902747/2021-04/123/Screenshot_2021-04-20_14-11-37_hhtb3n.png)

and it working

So, let's try with gutenprint gimp interface. In setup menu choose manufacture printer do you need and choose ""Custom command" to run `lp` command with Epson L350 class

![](https://res.cloudinary.com/bimagv/image/upload/v1618903570/2021-04/123/Screenshot_2021-04-20_14-17-43_whnb4c.png)

and it work perfectly

## L Series support with gutenberg list

| --- | --- | --- |
| Epson L120 | escp2-l120 |  |
| Epson L130 | escp2-l130 |  |
| Epson L210 | escp2-l210 |  |
| Epson L310 | escp2-l310 |  |
| Epson L1300 | escp2-l1300 |  |
| Epson L1800 | escp2-l1800 |

## Reference

* [List of Gutenprint supported printers](http://gimp-print.sourceforge.net/p_Supported_Printers.php)