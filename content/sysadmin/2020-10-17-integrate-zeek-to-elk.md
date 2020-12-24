---
type   : post
title  : "Integrate Zeek to ELK - Installation"
date   : 2020-10-17T15:11:35+07:00
categories: [sysadmin]
tags      : [elastic, kibana, Zeek]

excerpt:
    Installing Zeek in Elastic Stack
---

### Preface
>Main idea: Installing Zeek in Elastic Stack

### Reading
- [Bro ELK Pt. 1 (2018 article)](https://logz.io/blog/bro-elk-part-1/)
- [Create enterprise monitoring home with Zeek and ELK Pt. 1 (2020 article)](https://newtonpaul.com/create-enterprise-monitoring-at-home-with-zeek-and-elk-part-1/)
- [Create enterprise monitoring home with Zeek and ELK Pt. 2 (2020 article)](https://newtonpaul.com/create-enterprise-monitoring-at-home-part-2-shipping-zeek-logs-to-elk/)

### Installing dependency
Required dependency

    sudo apt-get install cmake make gcc g++ flex bison libpcap-dev libssl-dev python-dev swig zlib1g-dev libpcap-dev libssl-dev

Build dependency

    sudo apt-get install cmake make gcc g++ flex bison libpcap-dev libssl-dev python-dev swig zlib1g-dev

Source: https://docs.zeek.org/en/current/install/install.html#prerequisites

### Installation Zeek
Create zeek dir in ```/opt/zeek```

```
sudo mkdir /opt/zeek

#to avoid permission denied
sudo chown -R arjunavm:arjunavm /opt/zeek
sudo chmod 740 /opt/zeek
```

Installing Zeek from source
```
mkdir app
cd app
git clone -–recursive https://github.com/zeek/zeek
cd zeek
./configure --prefix=/opt/zeek
make
sudo make install
```

Add Zeek installation to $PATH

    export PATH=/opt/zeek/bin:$PATH

Now we’re ready to deploy Zeek by running the command below

    zeekctl deploy

If all goes well we should not get any errors, and we can check to make sure everything started up properly by checking the status of zeek with ```zeekctl status``` command

### Test zeek
    arjunavm@arjunavm /o/z/s/z/site> zeekctl status
    Hint: Run the zeekctl "deploy" command to get started.
    Name         Type       Host          Status    Pid    Started
    zeek         standalone localhost     stopped
