+++
categories = ["network"]
date = 2021-02-06T17:00:00Z
excerpt = "pfSense configuration to allow inbound traffic for internet and remote connection in client-side "
tags = ["pfsense", "openwrt"]
title = "Setup pfSense - Firewall behind Router (OpenWRT)"
type = "post"

+++
### Preface

> pfSense configuration to allow inbound traffic for internet connection in client-side and remote site

### Actually lab

![](https://res.cloudinary.com/bimagv/image/upload/v1612686474/2021-02/123/2021-02-07--T08-26-41_davjju.png)

### Prerequisite

> pfSense can connect to the internet and have an access to implement a remote access.

To do this, OpenWRT must be configured such as intial config, static route (to client-side), default route (internet), setup Firewall Zones and PortForward Firewall rules.

pfSense too, it's need to configure basic things like LAN/WAN/OPT1 interface and default gateway.

#### OpenWRT: Configure Zones (interface) Firewall

![](https://res.cloudinary.com/bimagv/image/upload/v1612696330/2021-02/123/2021-02-07--T11-11-37_ymgb5i.png)

**WAN interface** (Zona_W_AN) must be **Masquarade** and the Source zones match forwarded traffic from other zones_

**WAN interface's source zone targeted at "Zona to_pF"**

![](https://res.cloudinary.com/bimagv/image/upload/v1612697078/2021-02/123/2021-02-07--T11-24-01_wwxnmv.png)

And then, **LAN interface** (Zona to_pF) must be setup for _Destination zones_ match forwarded traffic from other zones.

**LAN interface's destination zones targeted at "Zona_WAN"**

![](https://res.cloudinary.com/bimagv/image/upload/v1612697254/2021-02/123/2021-02-07--T11-25-40_fwt29h.png)

#### OpenWRT: Configure Port Forwards Firewall

So, after that the physical interface LAN (Zone to_pF) is interface as pfSense gateway to be Remote Access or allows remote computers on the Internet/external network to be remoted pfSense or client host.

To do this, it's need to be allow **IPv4-tcp, udp, icmp** from **any host** or ip address  in the internet Via **any routers** or gateway. This is how gonna be look at.

![](https://res.cloudinary.com/bimagv/image/upload/v1612698154/2021-02/123/2021-02-07--T11-32-56_brqkii.png)

It's done! don't forget to enable OpenWRT firewall at System>Startup.

Now, pfSense can get a internet connection and have an access from OpenWRT router to implement a Remote Access VPN.

![](https://res.cloudinary.com/bimagv/image/upload/v1612704341/2021-02/123/2021-02-07--T13-25-23_c2f2dn.png)

### 1. Setup pfSense to allow inbound traffic for client internet connection

I know, In a fact pfSense is a router! But, as a firewall his will block any trafic by default. So, it will be my work to opened just **only** what I needs.

One of that must be configured or to be opened is client internet connection.

in network 192.168.190.0/24 client which is configured by DHCP can ping his gateway (192.168.137.1) and physical AP in my home (192.168.0.1). But not for internet access.

![](https://res.cloudinary.com/bimagv/image/upload/v1612704417/2021-02/123/2021-02-07--T13-24-02_cmcbga.png)

So, follow this step!

#### Allow Echo Request (ping access to pfSense WAN interface)

But wait... is this necessary?

maybe, this is needed for other needs. Skip for now. I will do it later in another section.

#### Allow Nat inside

l

### 2. Setup Remote Access in pfSense

As a what i told in beginning. I wanna setup pfSense to be have a connection to external network or internet. 