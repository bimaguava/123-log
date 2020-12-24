---
type   : post
title  : "Elastic stack - Create authentication portal"
date   : 2020-10-18T16:11:35+07:00
categories: [sysadmin]
tags      : [elastic, kibana]

excerpt:
    Create authentication (capative portal) in Elastic stack
---

### Preface
> Create authentication (capative portal) in Elastic stack

### Activate X-pack security
add X-pack security feature ```/etc/elasticsearch/elasticsearch.yml```

    xpack.security.enabled: true

it's need restart to be loaded with ```sudo systemctl restart elasticsearch```

### Generate Password built-in
```
cd /usr/share/elasticsearch/bin/
sudo ./elasticsearch-setup-passwords auto

Initiating the setup of passwords for reserved users elastic,apm_system,kibana,kibana_system,logstash_system,beats_system,remote_monitoring_user.
The passwords will be randomly generated and printed to the console.
Please confirm that you would like to continue [y/N]y


Changed password for user apm_system
PASSWORD apm_system = VXu9AfYKf6cz2BMBKaVM

Changed password for user kibana_system
PASSWORD kibana_system = AdAVkllWfIUoMZjbcOw6

Changed password for user kibana
PASSWORD kibana = AdAVkllWfIUoMZjbcOw6

Changed password for user logstash_system
PASSWORD logstash_system = eIqyyrBmq3DGicglGOJI

Changed password for user beats_system
PASSWORD beats_system = uJbFPB9HwuCkfRCVePZz

Changed password for user remote_monitoring_user
PASSWORD remote_monitoring_user = NchL9pglzFQMRtb8MXKX

Changed password for user elastic
PASSWORD elastic = hsB45CS6rW2v3EWupGi2
```

open ```/etc/kibana/kibana.yml``` and add

    elasticsearch.username: "kibana"
    elasticsearch.password: "AdAVkllWfIUoMZjbcOw6"

### Test authentication
restart kibana service and login on [http://13.92.240.53:5601](http://13.92.240.53:5601) with superuser

    user: elastic
    password: hsB45CS6rW2v3EWupGi2

![](https://res.cloudinary.com/bimagv/image/upload/v1608813753/2020-10/2020-10-18-elastic-stack-manage-authentication.png)

### Solve any error
If any error with this method. This command will be usefull

    sudo systemctl stop kibana
    curl -X DELETE "localhost:9200/.kibana
    sudo systemctl start kibana

### Resource
- Setup custom space - [http://13.92.240.53:5601/app/management/kibana/spaces/create](http://13.92.240.53:5601/app/management/kibana/spaces/create)
- Update/create roles - [http://13.92.240.53:5601/app/management/security/roles](http://13.92.240.53:5601/app/management/security/roles)
- Update/create roles - [http://13.92.240.53:5601/app/management/security/users](http://13.92.240.53:5601/app/management/security/users)

I have already setup my account with ```kibana_admin``` roles to as Kibana superuser
![](https://res.cloudinary.com/bimagv/image/upload/v1608814142/2020-10/2020-10-18-elastic-stack-manage-authentication-2.png)
