---
type   : post
title  : "Error Zeek at first test drive"
date   : 2020-10-17T16:11:35+07:00
categories: [sysadmin]
tags      : [elastic, kibana, zeek error]

excerpt:
    Error hint is pcap problem with interface eth0
---

### Error Hint
>stderr.log fatal error: problem with interface eth0 (pcap_error: socket: Operation not permitted (pcap_active))

### Information
Once that installation is done, I need to configure Zeek to convert the Zeek logs into JSON format.

First, stop Zeek from running with ```zeekctl stop```

And add ```@load policy/tuning/json-logs.zeek``` at local.zeek file

    $ sudo vim /opt/zeek/share/zeek/site/local.zeek

    @load policy/tuning/json-logs.zeek

Now, started again

![](https://res.cloudinary.com/bimagv/image/upload/v1608812895/2020-10/2020-10-17-zeek-first-run-error.png)

See that! it started with error message just like Zeek has not configured well.

### Not solved!
Still can't solve this error, because my VM is expired. But, somewhen I will try explore zeek again. I don't know exactly :v
