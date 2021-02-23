+++
categories = ["network"]
date = 2021-02-20T17:00:00Z
excerpt = "pfSense configuration to allow inbound traffic for internet connection in client-side and also implement a remote site"
tags = ["pfsense", "cisco"]
title = "pfSense - Firewall behind Router (Cisco)"
type = "post"

+++
### Preface

> Main idea: pfSense configuration to allow inbound traffic for internet connection in client-side and also implement a remote site

### Lab

![](https://res.cloudinary.com/bimagv/image/upload/v1614057646/2021-02/123/Screen_2021-02-23_09-38-51X_ljprva.png)

### Prerequisite

* connecting Cisco to the internet using default static route

    Router(config)#ip route 0.0.0.0 0.0.0.0 192.168.89.1
    Router(config)#ip name-server 8.8.8.8
    Router(config)#ip name-server 1.1.1.1
    Router(config)#ip domain-lookup
    

* s