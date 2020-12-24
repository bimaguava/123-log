---
type   : post
title  : "Docker Compose - linked phpmyadmin to mysql database & safe way to stop container"
date   : 2020-09-20T09:11:35+07:00
categories: [sysadmin]
tags      : [docker]

excerpt:
  Add Env variables (Docker Compose)
---

### Preface
>Add Env variables (Docker Compose)

Well, before I was posted a set up ```env``` and ```restart policy``` in gui method using portainer. docker compose is very managable with single file and command. Therefore I must explore this tool, **Docker Compose**  that you need for simply building a container and easy to manage in one file config.

### Docker-compose file
I will add two container, ```chatphpDB```  and ```phpmyadmin```  and also with many basic configuration, such as restart policy and environment.

First, create ```docker-compose.yml```

```
version: '3.7'

services:
   db:
      image: mysql:latest
      container_name: chatphpDB
      restart: always
      ports:
       - '6603:3306'
      environment:
        MYSQL_ROOT_PASSWORD: admin

   app:
      depends_on:
       - db
      image: phpmyadmin/phpmyadmin
      container_name: phpmyadmin
      restart: always
      ports:
       - '8889:80'
      environment:
        PMA_HOST: db
```

After, that run ```docker-compose.yml``` to create process

    ~/W/P/Chat_with_php_jquery_ajax ❯❯❯ docker-compose up -d
    Creating chatphpDB ... done
    Creating phpmyadmin ... done

or with --force option

    ~/W/P/Chat_with_php_jquery_ajax ❯❯❯ docker-compose -f docker-compose.yml up -d
    chatphpDB is up-to-date
    phpmyadmin is up-to-date

Thats all, login at [http://0.0.0.0:8889](http://0.0.0.0:8889) and voila

![](https://res.cloudinary.com/bimagv/image/upload/v1608740031/2020-09/2020-09-20-docker-linked-phpmyadmin-to-mysql-database-with-docker-composer.png)

Now, both containers are running and serving.

>Don’t execute the command ```docker-compose -f mysql-phpmyadmin.yml down``` as it will stop and remove the containers, networks, images, and volumes!

Instead, you can execute commands below to stop and start which are also safe for your container and it's assets.

stop

    ~/W/P/Chat_with_php_jquery_ajax ❯❯❯ docker-compose -f docker-compose.yml stop
    Stopping phpmyadmin ... done
    Stopping chatphpDB  ... done

and start

    ~/W/P/Chat_with_php_jquery_ajax ❯❯❯ docker-compose -f docker-compose.yml start
