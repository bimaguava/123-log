+++
categories = ["network"]
date = 2021-02-06T17:00:00Z
excerpt = "pfSense configuration to allow inbound traffic for internet connection in client-side "
tags = ["pfsense", "openwrt"]
title = "Setup pfSense - Firewall behind Router (OpenWRT)"
type = "post"

+++
### Preface

> pfSense configuration to allow inbound traffic for internet connection in client-side

### Actually lab

![](https://res.cloudinary.com/bimagv/image/upload/v1612686474/2021-02/123/2021-02-07--T08-26-41_davjju.png)

### Prerequisite

pfSense can connect to the internet.

To to this, the router (OpenWRT) must complete basic initial config as minimal requirement to control network traffic flow. Look at this Firewall Zone configuration.

![](https://res.cloudinary.com/bimagv/image/upload/v1612696330/2021-02/123/2021-02-07--T11-11-37_ymgb5i.png)

**WAN interface** (Zona_W_AN) must be **Masquarade** and the Source zones match forwarded traffic from other zones **targeted at "Zona to**_**_pF"**

![](https://res.cloudinary.com/bimagv/image/upload/v1612697078/2021-02/123/2021-02-07--T11-24-01_wwxnmv.png)

And then, **LAN interface** (Zona to_pF) must be setup for _Destination zones_ match forwarded traffic from other zones **targeted at "Zona_WAN"**

![](https://res.cloudinary.com/bimagv/image/upload/v1612697254/2021-02/123/2021-02-07--T11-25-40_fwt29h.png)