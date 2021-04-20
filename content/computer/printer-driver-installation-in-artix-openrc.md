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
  
 s