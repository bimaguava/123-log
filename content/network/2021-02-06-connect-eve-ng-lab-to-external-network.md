+++
categories = ["network"]
date = 2021-02-06T15:00:00Z
excerpt = "Adding static route to adapter used for eve-ng VM to connect external network"
tags = ["eve-ng"]
title = "Connect Eve-NG node to external network"
type = "post"

+++
### Preface

> Main idea: Adding static route to adapter used for eve-ng VM to connect external network

### Foreign Network list

#### Blok A

* 192.168.1.0/24
* 10.10.10.0/30
* 192.168.195.0/24
* 192.168.175.0/24

#### Blok B

* 10.0.0.0/30
* 192.168.190.0/24
* 192.168.160.0/30

### Remote the Network

Eve-NG Lab is locate in another virtualization (Overlay). In other case I can call it part of Software Defined Network. Different with Eve-NG VM network. it's locate in surface network which directly connected to VMnet1 adapter (192.168.137.1)

So, theris connecting the network lab to external network is not recommended because can break essence of the Lab workspace. Except, there are other different needs.

### 