+++
categories = ["network"]
date = 2021-02-20T17:00:00Z
draft = true
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

* connecting cisco to the internet (NAT cloud) and allow inbound traffic (traffic from internet to local area network)  

      Router(config)# int fa0/0
      Router(config-if)# ip add dhcp
      Router(config-if)# ip nat outside
      Router(config-if)# no sh
      Router(config)# ip route 0.0.0.0 0.0.0.0 192.168.89.1
      Router(config)# ip nat inside source list 1 interface FastEthernet0/0 overload
      Router(config)#ip name-server 8.8.8.8
      Router(config)#ip domain-lookup
* setting up LAN interface and allow outbound (traffic from LAN interface) traffic

      Router(config)# int fa0/1
      Router(config-if)# ip add 192.168.1.1 255.255.255.0
      Router(config-if)# ip nat inside
      Router(config-if)# no sh
* adding Access-List 1 **(This allows the LAN to get connection to the internet)**. It will be use wilcard mask instead of subnet mask

      ICT(config)# access-list 1 permit 192.168.1.0 0.0.0.255
* Verify

      Router(config)# show interface ethernet1/0 (verify the LAN IP configuration)
      Router(config)# show interface fastethernet 0/0 (verify External/ISP IP configuration and status)
      Router(config)# Show ip route (show your routing statement if its correct)
      Router(config)# show ip nat translations (This is to confirm if your nat statements are right)
      Router(config)# show access-lists (configured access lists)

don't forget to save router config with `do wr`.

Now, pfSense can ping to 8.8.8.8, but no with internet. So,