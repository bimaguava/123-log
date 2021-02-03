+++
categories = ["network"]
date = 2021-02-02T17:00:00Z
excerpt = "Doing firewall with FortiGate is easy! This is basic information about Policy & Object"
tags = ["fortigate"]
title = "Basic Firewall FGT - Policy & Object"
type = "post"

+++
### Main Idea

> basic information about Policy & Object in FortiGate

Goal: 

* Allow internet traffic trough the FortiGate Firewall
* 

### Requisite

* Setup LAN/WAN interface and IP
* adding default static route in FortiGate (Accesi internet)

### Reading

* [https://help.fortinet.com/fmgr/50hlp/56/5-6-2/FortiManager_Admin_Guide/1200_Policy%20and%20Objects/0000_Policies-&-Objects.htm](https://help.fortinet.com/fmgr/50hlp/56/5-6-2/FortiManager_Admin_Guide/1200_Policy%20and%20Objects/0000_Policies-&-Objects.htm "https://help.fortinet.com/fmgr/50hlp/56/5-6-2/FortiManager_Admin_Guide/1200_Policy%20and%20Objects/0000_Policies-&-Objects.htm")
* [https://docs.fortinet.com/document/fortigate/latest/administration-guide/118003/policies](https://docs.fortinet.com/document/fortigate/latest/administration-guide/118003/policies "https://docs.fortinet.com/document/fortigate/latest/administration-guide/118003/policies")
* [https://docs.fortinet.com/document/fortigate/5.4.0/cookbook/853759](https://docs.fortinet.com/document/fortigate/5.4.0/cookbook/853759 "https://docs.fortinet.com/document/fortigate/5.4.0/cookbook/853759")

### Illustration of FortiGate Policy

Like firewall in general, when the firewall receives a connection packet, it analyzes the **source address**, **destination address**, and **service** (by port number).

It also registers the incoming interface, the outgoing interface it needs to use, and the time of day. Using this information, the FortiGate firewall attempts to locate a security policy that matches the packet.

If a policy matches the parameters, then the FortiGate takes the required action for that policy. If it is**,**

* **_Accept_**, the traffic is allowed to proceed to the next step (**the policy permits communication sessions**). 
* If the action is **_Deny_** or a match cannot be found, the traffic is not allowed to proceed. (**the policy blocks communication sessions**)

It's methodology in general.

Technically, this traffic (if uses IPv4) contains:

* **_Internet_**: a policy allowing general Internet access to the LAN
* **_Mobile_**: a policy allowing Internet access while applying web filtering for mobile devices. In this example, a wireless network has already been configured that is in the same subnet as the wired LAN.
* **_Admin_**: a policy allowing the system administrator's PC (named SysAdminPC) to have full access

![](https://fortinetweb.s3.amazonaws.com/docs.fortinet.com/v2/resources/598118ae-ea1f-11e9-8977-00505692583a/images/163c545d1db7ea0bf7d84f4eb220a97e_diagram.png)

### Creating internet policies

### Creating 