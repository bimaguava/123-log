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

### Requisite

pfSense can connect to the internet.

To to this, the router (OpenWRT) must complete basic initial config as minimal requirement to control network traffic flow. Like this:

* interface-wan->