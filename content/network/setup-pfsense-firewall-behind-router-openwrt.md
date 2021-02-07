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

#### Configure Firewall - Zones (interface)

![](https://res.cloudinary.com/bimagv/image/upload/v1612696330/2021-02/123/2021-02-07--T11-11-37_ymgb5i.png)

**WAN interface** (Zona_W_AN) must be **Masquarade** and the Source zones match forwarded traffic from other zones_ 

**WAN interface's source zone targeted at "Zona to_pF"**

![](https://res.cloudinary.com/bimagv/image/upload/v1612697078/2021-02/123/2021-02-07--T11-24-01_wwxnmv.png)

And then, **LAN interface** (Zona to_pF) must be setup for _Destination zones_ match forwarded traffic from other zones.

**LAN interface's destination zones targeted at "Zona_WAN"**

![](https://res.cloudinary.com/bimagv/image/upload/v1612697254/2021-02/123/2021-02-07--T11-25-40_fwt29h.png)

#### Configure Firewall - Port Forwards

So, after that the physical interface LAN (Zone to_pF) is interface as pfSense gateway to be Remote Access or allows remote computers on the Internet/external network to be remoted pfSense or client host.

To do this, it's need to be allow **IPv4-tcp, udp, icmp** from **any host** or ip address  in the internet Via **any routers** or gateway. This is how gonna be look at.

![](https://res.cloudinary.com/bimagv/image/upload/v1612698154/2021-02/123/2021-02-07--T11-32-56_brqkii.png)

It's done! don't forget to enable OpenWRT firewall at System>Startup.

### 