---
type   : post
title  : "Elasticsearch & Kibana installation in Ubuntu 18.04 VPS"
date   : 2020-10-17T13:11:35+07:00
categories: [sysadmin]
tags      : [elastic, kibana]

excerpt:
    Tutorial installation of Elasticsearch & Kibana in Ubuntu 18.04 VPS
---

### Preface
>Main idea: Tutorial installation of Elasticsearch & Kibana in Ubuntu 18.04 VPS

### Prerequisites
- Oracle java 8^
- OpenJDK 8^
- Nginx

To run Kibana the server must be minimal 4 GB RAM.

### Install requirements
- [Easy to install Oracle Java SE 11 in Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-18-04) (please get installer source from oracle site!)
- Nginx installation with ```apt```

### ElasticSearch
#### installation
    wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
    echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
    sudo apt update
    sudo apt install elasticsearch

#### Setup Elastic
If you need to setup for localhost in LAN just use localhost as ```network.host``` for public change with 0.0.0.0 In this case we need to setup in public.

Setup in YAML file ```/etc/elasticsearch/elasticsearch.yml``` before starting service

```
### Doesn't work with:
#network.host: 0.0.0.0
#http.port: 9200


# Network
network.bind_host: 0.0.0.0
node.master: true
node.data: true
transport.host: localhost
transport.tcp.port: 9300

# Cluster
cluster.name: my-application
# Node
node.name: node-1
```

Elasticsearch use port ```9300```, you should make **new open inbound port rules** for port ```9300```.

**Protocol** set to ```tcp``` to open java service used for Elasticsearch.

After that, you already to start Elasticsearch service

    sudo systemctl start elasticsearch
    sudo systemctl enable elasticsearch

#### Test application
Test at [http://localhost:9200](http://localhost:9200)

```
curl -X GET "localhost:9200"

{
  "name" : "ElasticSearch",
  "cluster_name" : "my-application",
  "cluster_uuid" : "SMYhVWRiTwS1dF0pQ-h7SQ",
  "version" : {
    "number" : "7.6.1",
    "build_flavor" : "default",
    "build_type" : "deb",
    "build_hash" : "aa751e09be0a5072e8570670309b1f12348f023b",
    "build_date" : "2020-02-29T00:15:25.529771Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

### kibana
#### Installation
```
sudo apt install kibana
sudo systemctl enable kibana
sudo systemctl start kibana
echo "kibanaadmin:`openssl passwd -apr1`" | sudo tee -a /etc/nginx/htpasswd.users
```

#### Setup Web server
Create new sites in nginx web server. I don't need DNS, so this just name of my services

    sudo nano /etc/nginx/sites-available/mykibana.com

add following content to ```/etc/nginx/sites-available/mykibana.com```

```
server {
    listen 80;

    server_name mykibana.com;

    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/htpasswd.users;

    location / {
        proxy_pass http://localhost:5601;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Kibana used port ```5601```, you need open for this port.

enable the new configuration by creating a symbolic link to the ```sites-enabled``` directory.

    sudo ln -s /etc/nginx/sites-available/mykibana.com /etc/nginx/sites-enabled/mykibana.com
    sudo nginx -t

Before start kibana service, setup kibana ```server.host```

open ```/etc/kibana/kibana.yml```

    server.host:"0.0.0.0"

start service

    sudo systemctl start kibana
    sudo systemctl enable kibana
    sudo systemctl start nginx
    sudo systemctl enable nginx

If you followed the initial server setup guide, you should have a UFW firewall enabled. To allow connections to Nginx, we can adjust the rules by typing:

    sudo ufw allow 'Nginx Full'

open [http://13.92.240.53:5601](http://13.92.240.53:5601)

### Reference
- https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elastic-stack-on-ubuntu-18-04
- https://docs.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-elasticsearch
- https://discuss.elastic.co/t/elasticsearch-network-bind-for-public-private/83644
