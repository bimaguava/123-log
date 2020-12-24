---
type   : post
title  : "Logstash and Filebeat installation & setup in Ubuntu 18.04 VPS"
date   : 2020-10-17T14:11:35+07:00
categories: [sysadmin]
tags      : [elastic, kibana]

excerpt:
    Tutorial installation setup of Logstash & Filebeat in Ubuntu 18.04 VPS
---

### Preface
>Main idea: Tutorial installation setup of Logstash & Filebeat in Ubuntu 18.04 VPS

### Reading
For installation: [How to install elasticsearch logstash and kubana elastic(stack)](https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elastic-stack-on-ubuntu-18-04)

I have to install Filebeats on the host where you are shipping the logs from.

So in our case, we’re going to install Filebeat onto our Zeek server.

Follow the instructions specified on the page to install Filebeats, once installed edit the ```filebeat.yml``` in ```/etc/kibana/kibana.yml``` configuration file and change the appropriate fields. The username and password for Elastic should be kept as the default unless you’ve changed it.

Make sure to change the Kibana output fields as well.

```
# ---------------------------- Elasticsearch Output ----------------------------
output.elasticsearch:
  # Array of hosts to connect to.
  hosts: ["0.0.0.0:5044"]

  # Protocol - either `http` (default) or `https`.
  #protocol: "https"

  # Authentication credentials - either API key or username/password.
  #api_key: "id:api_key"
  username: "bima"
  password: "masakoseribu"

```
