---
type   : post
title  : "Docker and pydio file sharing server in Kali Linux"
date   : 2020-11-24T09:11:35+07:00
categories: [sysadmin]
tags      : [docker, Kali Linux, pydio]

excerpt:
  Installations docker & pydio in Kali Linux
---

### Preface
>main idea: Installations docker & pydio in Kali Linux

### Docker installation
#### snap package manager
Installations docker & pydio in Kali Linux

    apt install snapd

and then make executable path to Kali Linux machine. Just like this

    $ vim ~/.bash-profile
    export PATH="$HOME/.cargo/bin:$PATH"
    export PATH="$PATH:/snap/bin"

Snap clear, dont forget to run it

    systemctl enable snapd.service
    systemctl start snapd.service

    systemctl restart apparmor.service
    systemctl enable apparmod.service

#### docker
    snap install docker
    snap start docker

#### pydio (file sharing server)
create ```docker-compose.yml```

```
version: '3'

services:

  cells:
    image: pydio/cells:latest
    restart: always
    ports: ["8080:8080"]
    environment:
      - CELLS_BIND=files.example.com:8080
      - CELLS_EXTERNAL=https://files.example.com:8080
    volumes:
      - "workingdir:/var/cells"
      - "datadir:/var/cells/data"

  # MySQL image with a default database cells and a dedicated user pydio
  mysql:
    image: mysql:5.7
    restart: always
    ports: ["3306:3306"]
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: cells
      MYSQL_USER: pydio
      MYSQL_PASSWORD: secret
    command: [mysqld, --character-set-server=utf8mb4, --collation-server=utf8mb4_unicode_ci]
    volumes:
      - "mysqldir:/var/lib/mysql"

volumes:
  workingdir: {}
  datadir: {}
  mysqldir: {}
```

run with ```docker-compose up```

![](https://res.cloudinary.com/bimagv/image/upload/v1608792056/2020-11/2020-11-24-kali-linux-install-docker-using-snapcraft-and-install-pydio-file-sharing-server.png)

boom! my internet very slow motion

...To be continued
