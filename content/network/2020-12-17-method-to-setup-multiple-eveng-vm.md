---
type   : post
title  : "Method how to setup multiple Eve-ng VM in one machine"
date   : 2020-12-17T16:11:35+07:00
categories: [network]
tags      : [eve-ng]

excerpt:
    setup multiple Eve-ng VM in one machine
---

### Preface
> Main idea: setup multiple Eve-ng VM in one machine

In this setup I need get 2 Local Area Network and also 2 internet source. how to get it?

Anyway, thereis no idea with Virtualbox, eve-ng.ova file can't be correctly export with Virtual Box. For virtual machine orchestra I'm using VMware Workstation 15 Pro

### Network physical adapter
I have 1 Wireless interface: Intel Centrino

### Examine the setup method 1
#### Eve-NG S1 Network address: 192.168.137.128
- VMnet1 (Host only)
- shared internet from Intel Centrino

#### Eve-NG S2 Network address: 192.168.195.128
- VMnet8 DHCP setup (I can't be static) (NAT)

While 2 VM actived, first VM (Eve-ng S1) get Internet source is from main Wireless adapter (intel Centrino) shared connection. But, it can't be stable because another VM has consumed this source too. Connection in two VM will be fail.

>I don't know why Intel Centrino can't process dual connection (shared to VMnet1 and proces connection to VMnet/NAT).

### Examine the setup method 2
#### Eve-NG S1 Network address: 192.168.137.128
- VMnet1 (Host only)
- shared internet from Intel Centrino

#### Eve-NG S2 Network address: 192.168.195.128
- VMnet8 custom interface
- shared internet from USB TL-WN7255N with another internet source e.g: android hotspot

Solution to running this 2 VM, my VMnet need get a shared internet from another Wireless adapter and using another WiFi connection or internet source. So, I will get 192.168.137 from my other wireless network e.g: TPLink USB adapter or Ethernet Gigabit LAN adapter.

### Another way is actually **not working**
- Bridging wireless adapter to VMnet1 (VMware not support their virtual adapter to bridge with wireless adapter in my X220)
- Use multiple network adapter in Eve-NG S1. VMnet1 (host only) and NAT or VMnet8 (NAT). Because is not my workflow. I'm still get same network with Eve-NG S2 192.168.195.xxx
