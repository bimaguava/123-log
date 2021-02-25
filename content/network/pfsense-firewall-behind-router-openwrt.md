+++
categories = ["network"]
date = 2021-02-06T17:00:00Z
excerpt = "pfSense configuration to allow inbound traffic for internet and remote connection in client-side and also implement a remote access "
tags = ["pfsense", "openwrt"]
title = "pfSense - Firewall behind Router (OpenWRT) *bonus how to do it with Cisco router"
type = "post"

+++
### Preface

> pfSense configuration to allow inbound traffic for internet connection in client-side and also implement a remote site

As a Firewall pfSense will be block all connection in LAN interface, _except_ it's web configuration :xD (because it's directly connected to pfSense)

![](https://res.cloudinary.com/bimagv/image/upload/v1612716092/2021-02/123/2021-02-07--T16-40-26_xauyhl.png)

Also his block all traffic comes from WAN interface. So if you ping pfSense from WAN interface you get 100% packet loss :v.

![](https://res.cloudinary.com/bimagv/image/upload/v1612715981/2021-02/123/2021-02-07--T16-21-31_kan6r9.png)

### Lab Actually

![](https://res.cloudinary.com/bimagv/image/upload/v1612686474/2021-02/123/2021-02-07--T08-26-41_davjju.png)

### Prerequisite: Connecting Firewall to the internet

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

And let's see..

![](https://res.cloudinary.com/bimagv/image/upload/v1612704341/2021-02/123/2021-02-07--T13-25-23_c2f2dn.png)

Now I'm clear with prerequisite, my pfSense can get a internet connection and have an access from OpenWRT router to implement a Remote Access VPN.

#### Bonus: How it different with Cisco config?

Now, I will show the different firewall configuration in other router vendor, example is Cisco.

This is the example method in Cisco router.

**Note:**

> **Inbound traffic** is traffic came in from internet or WAN.
>
> **Outbound traffic** is traffic where come from LAN interface. Such as applications, user or etc.

* setting WAN interface to allow inbound traffic (traffic from internet to local area network)

      Router(config)# int fa0/0
      Router(config-if)# ip add dhcp
      Router(config-if)# ip nat outside
      Router(config-if)# no sh

  connecting cisco to the internet (NAT cloud) with default static route and setup custom dns server

      Router(config)# ip route 0.0.0.0 0.0.0.0 192.168.89.1
      Router(config)# ip name-server 8.8.8.8
      Router(config)# ip domain-lookup

  **WAN interface** need to be ruled with **nat outside** in Cisco.
* setting up LAN interface and allow outbound (traffic from LAN interface) traffic

      Router(config)# int fa0/1
      Router(config-if)# ip add 192.168.1.1 255.255.255.0
      Router(config-if)# ip nat inside
      Router(config-if)# no sh

  at **LAN interface** exactly it need tobe ruled with **nat inside**
* NAT rule statements for LAN interface

      Router(config)# ip nat inside source list 1 interface FastEthernet0/0 overload
* adding Access-List 1 **(This allows the LAN to get connection to the internet)**. It will be use wilcard mask instead of subnet mask

      ICT(config)# access-list 1 permit 192.168.1.0 0.0.0.255

  If use Cisco, now pfSense can ping to 8.8.8.8, but no with internet. So, Access-List config need to be allow for ICMP traffic.

  Done.

Next is follow this 2 steps to get and manage internet for client and implement Remote Access.

### Step 1: Setup pfSense to allow inbound traffic for client internet connection

I know, In a fact pfSense is a router! But, as a firewall his will block any trafic by default. So, it will be my work to opened just **only** what I needs.

One of that must be configured or to be opened is client internet connection.

**This screenshoot indicate client need to access ICMP Protocol**

![](https://res.cloudinary.com/bimagv/image/upload/v1612704417/2021-02/123/2021-02-07--T13-24-02_cmcbga.png)

**And this screenshoot indicate client need to access DNS (53), HTTP (80), HTTPS (443) port**

![](https://res.cloudinary.com/bimagv/image/upload/v1612716137/2021-02/123/2021-02-07--T16-39-06_uahiah.png)

So, follow this

#### Create LAN Group Aliases

> I recomended to do this because it will be completely easier for manage something for a lots of user in different connection and needs. So, implement a group or Aliases will be simplify your access management :v

In case rule to allowing internet access (https, http, dns) his need to know **who is the man will be applied to this LAN rule (address, group, aliases, or something)**. This man It's called **Source**.

And **what is service or port to be asssign in rule**. It's called **Destination.**

First, I need to be setup **Source** which is will be grouped in firewall rule as **"Alliases"**.

It will grouped base on the directly connected port (LAN port/vtnet1)

![](https://res.cloudinary.com/bimagv/image/upload/v1612712133/2021-02/123/2021-02-07-T15-34-37_skecbi.png)

I will create an aliases name: **ein_floor1**

So, go to Firewall>Aliases>Port and create new aliases with

* "name: ein_floor1"
* "Type: network(s)"
* "Port: vtnet1"

![](https://res.cloudinary.com/bimagv/image/upload/v1612713359/2021-02/123/2021-02-07--T15-53-35_cpovmt.png)

That's all. Now I have grouped for lan network (192.168.190.0/24)

#### Create rule (in LAN interface firewall) to allow dns, https and http traffic

Enter Firewall>Rules>LAN menu and create new rules with "action: passed" to allow the spesific traffic, "Interface: LAN", "Address Family: IPv4" and "protocol: TCP/UDP".

![](https://res.cloudinary.com/bimagv/image/upload/v1612707733/2021-02/123/2021-02-07--T14-14-36_miq0si.png)

![](https://res.cloudinary.com/bimagv/image/upload/v1612708709/2021-02/123/2021-02-07--T14-32-24_o5z8bo.png)

So, first rule to allow DNS  
![](https://res.cloudinary.com/bimagv/image/upload/v1612709502/2021-02/123/2021-02-07--T14-50-50_an4xj5.png)

Second, rule to allow HTTPS

![](https://res.cloudinary.com/bimagv/image/upload/v1612709743/2021-02/123/2021-02-07--T14-54-04_cjemwz.png)

Third, rule to allow HTTP

![](https://res.cloudinary.com/bimagv/image/upload/v1612709785/2021-02/123/2021-02-07--T14-54-54_qfn5iu.png)

Now, grouped client in LAN network (192.168.190.0/24) can access internet.

![](https://res.cloudinary.com/bimagv/image/upload/v1612714679/2021-02/123/2021-02-07--T16-16-43_tcivnw.png)

Ouh my god...............................

Wow, it still not get internet access :v

Wait I must check up ...

Oooouh ...

Amazing!!! ICMP Protocol not in rule!!! This is why the client still not get the internet access.

Sorry, I'm forget this one haha...

So, lets add rule for WAN interface.

#### Create rule (in LAN interface firewall) to ICMP Protocol traffic (sorry I'm forgot this)

![](https://res.cloudinary.com/bimagv/image/upload/v1612716603/2021-02/123/2021-02-07--T16-49-02_g8vjrn.png)

![](https://res.cloudinary.com/bimagv/image/upload/v1612716623/2021-02/123/2021-02-07--T16-49-33_uvkzkb.png)

So, in Step 1 (LAN interface rules) we have all this rule.

![](https://res.cloudinary.com/bimagv/image/upload/v1612716837/2021-02/123/2021-02-07--T16-52-47_cmxacc.png)

### Step 2: Setup Remote Access in pfSense

As a what i told in beginning. I wanna setup pfSense to be have a connection to external network or internet.