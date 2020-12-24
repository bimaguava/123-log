---
type   : post
title  : "Docker volumes introduction - solve the case"
date   : 2020-09-21T09:11:35+07:00
categories: [sysadmin]
tags      : [docker]

excerpt:
  little bit explanation about docker volumes & --no-deps option
---

### Preface
Okay docker! we back again.. came out with many resource here. Before, we have examples about MySQL dan phpmyadmin and I want to see their relationship.

### Container Connection
Remember the IP address containers is dynamic were change from docker subnet interfaces ```172.17.42.1/16``` on every running container. Let's inspect the network address of container!

#### chatphpDB
```
$ docker inspect chatphpDB | grep IPAddress
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.18.0.2",
```

to verify just access with ```mysql -uroot -padmin -h 172.18.0.2 -P 3306``` and also with optional command to check past configuration with docker compose in here: [**Docker volumes introduction - using volumes with compose & error**](http://123log.netlify.app/sysadmin/2020-09-21-docker-compose-little-bit-explanation-about-docker-volumes/). The max_connections value should be 250 as I made before

![](https://res.cloudinary.com/bimagv/image/upload/v1608746876/2020-09/little-bit-explanation-about-docker-volumes-pt.2.png)

This is the hell in chatphpDB container

```
$ mysql -uroot -padmin -h127.0.0.1 -P6603 -e 'show global variables like "max_connections"';
mysql: [Warning] Using a password on the command line interface can be insecure.
+-----------------+-------+
| Variable_name   | Value |
+-----------------+-------+
| max_connections | 214   |
+-----------------+-------+
```

There is no change, it means mounted file system in my external folder are not completely success.
>This is the reason I posted this for my documentation.

#### phpmyadmin
```
$ docker inspect phpmyadmin | grep IPAddress
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.18.0.3",
```

In phpmyadmin container of course I can login with username root and password admin, we have setting up their in here: [**Docker Compose - linked phpmyadmin to mysql database & safe way to stop container**](http://localhost:1313/sysadmin/2020-09-20-docker-linked-phpmyadmin-to-mysql-database-with-docker-composer/). Because it was linked with MySQL database in ```/var/lib/mysql```

![](https://res.cloudinary.com/bimagv/image/upload/v1608747097/2020-09/2020-09-21-little-bit-explanation-about-docker-volumes-pt.2-2.png)
(login successful)

another verification is check hostnames stored in ```/etc/hosts```

entered to docker container shell

    docker exec -it phpmyadmin bash

![](https://res.cloudinary.com/bimagv/image/upload/v1608747214/2020-09/2020-09-21-little-bit-explanation-about-docker-volumes-pt.2-3.png)

and see it has connect with mysql in ```/etc/hosts```

    ...
    172.18.0.3    7d6658d5af22

Let's get mapped!
```
$ docker ps
CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS              PORTS                                            NAMES
b3bdd7c099e8        mysql:latest            "docker-entrypoint.s…"   5 hours ago         Up 2 hours          33060/tcp, 0.0.0.0:6603->3306/tcp                chatphpDB
7d6658d5af22        phpmyadmin/phpmyadmin   "/docker-entrypoint.…"   39 hours ago        Up 2 hours          0.0.0.0:8889->80/tcp                             phpmyadmin
```

1[](https://res.cloudinary.com/bimagv/image/upload/v1608783369/2020-09/2020-09-21-little-bit-explanation-about-docker-volumes-pt.2-4.png)
(graphical map linked MySQL and phpmyadmin container)

### Solving my case
#### Back to simple directory mounts config
Before, the configuration with docker compose not working because I'm not clearly understood playing with docker compose and just create simple **custom.cnf** program to set max connection, run it with stupid copy & paste program.

So, we will verify first chatphpDB container

First is mounted MySQL configuration file in **/home/...docker/chatphpDB/conf.d**

![](https://res.cloudinary.com/bimagv/image/upload/v1608783521/2020-09/2020-09-21-little-bit-explanation-about-docker-volumes-pt.2-5.png)

Second is mounted MySQL Data directory in **/home/bima... docker/chatphpDB/data-dir**

![](https://res.cloudinary.com/bimagv/image/upload/v1608783666/2020-09/2020-09-21-little-bit-explanation-about-docker-volumes-pt.2-6.png)

In this case I will show you what is **non-persistance data** is. When I remove the container that file is not stored in any place. So, no back up your file project was also deleted.

I'll ready to delete the **chatphpDB** was not mounted in any place because I'm not properly set a volumes before. just delete with ```docker container remove <container ID>``` command

After deleting I will create what I need with this command line

#### docker run command
```
$ docker run \
  --detach \
  --name=chatphpDB \
  --env="MYSQL_ROOT_PASSWORD=admin" \
  --publish 6603:3306 \
  --volume=/home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/conf.d:/etc/mysql/conf.d \
  --volume=/home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB//data-dir:/var/lib/mysql \
  mysql
```

See! I change name services from db to mysql because that phpmyadmin will not lose connect after this.

#### docker compose command
another way with docker compose
```
services:
   mysql:
      image: mysql:latest
      container_name: chatphpDB
      restart: always
      ports:
       - '6603:3306'
      environment:
        MYSQL_ROOT_PASSWORD: admin
      volumes:
       - /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/conf.d:/etc/mysql/conf.d
       - /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/data-dir:/var/lib/mysql
```

After that you will see IP address changes. So mapped it again. Now clearer to see the directory and files on the machine host created by this container:

login to container
```
root@4efa11c7e52d:/var/lib/mysql# ls
'#ib_16384_0.dblwr'   auto.cnf	      binlog.index   client-cert.pem   ib_logfile0   ibtmp1	 performance_schema   server-cert.pem   undo_001
'#ib_16384_1.dblwr'   binlog.000001   ca-key.pem     client-key.pem    ib_logfile1   mysql	 private_key.pem      server-key.pem    undo_002
'#innodb_temp'	      binlog.000002   ca.pem	     ib_buffer_pool    ibdata1	     mysql.ibd	 public_key.pem       sys
```

back to host machine
```
$ cd data-dir/
$ ls
 auto.cnf        binlog.index   client-cert.pem     '#ib_16384_1.dblwr'   ib_logfile0  '#innodb_temp'/   performance_schema/   server-cert.pem   undo_001
 binlog.000001   ca-key.pem     client-key.pem       ib_buffer_pool       ib_logfile1   mysql/           private_key.pem       server-key.pem    undo_002
 binlog.000002   ca.pem        '#ib_16384_0.dblwr'   ibdata1              ibtmp1        mysql.ibd        public_key.pem        sys/
```

That's all... building new chatphpDB.

If you remove the MySQL container, the data in the mounted volumes will still be intact and you can run a new instance, mounting the same volume as data directory.

### phpmyadmin (app) and new chatphpDB (db) containers
Here is my **docker-compose.yml**

First, I will commented line of **db** services, because I want to update configuration in **app** (phpmyadmin container)
```
version: '3.7'

services:
#   db:
#      image: mysql:latest
#      container_name: chatphpDB
#      restart: always
#      ports:
#       - '6603:3306'
#      environment:
#        MYSQL_ROOT_PASSWORD: admin
#      volumes:
#       - /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/conf.d:/etc/mysql/conf.d
#       - /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/:/var/lib/mysql

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

Changes ```depends_on``` from **db** services to mysql

```
app:
   depends_on:
    - mysql
```

and ```environment variables```

```
...
    environment:
      PMA_HOST: mysql
```

And here is I have now

Don't forget to rename the **db** services to **mysql**

```
version: '3.7'

services:
#   mysql:
#      image: mysql:latest
#      container_name: chatphpDB
#      restart: always
#      ports:
#       - '6603:3306'
#      environment:
#        MYSQL_ROOT_PASSWORD: admin
#      volumes:
#       - /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/conf.d:/etc/mysql/conf.d
#       - /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/:/var/lib/mysql

   app:
      depends_on:
       - mysql
      image: phpmyadmin/phpmyadmin
      container_name: phpmyadmin
      restart: always
      ports:
       - '8889:80'
      environment:
        PMA_HOST: mysql
```

Btw,
>commented first container is not running while I run docker compose -d up. But theris another way :v

This way is not delete first container like the past way. I will use **--no-deps** option like this

>**docker-compose** up -d **--no-deps** --build <services_name>

So, uncommented  the **mysql** services
```
version: '3.7'

services:
   mysql:
      image: mysql:latest
      container_name: chatphpDB
      restart: always
      ports:
       - '6603:3306'
      environment:
        MYSQL_ROOT_PASSWORD: admin
      volumes:
       - /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/conf.d:/etc/mysql/conf.d
       - /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/:/var/lib/mysql

   app:
      depends_on:
       - mysql
      image: phpmyadmin/phpmyadmin
      container_name: phpmyadmin
      restart: always
      ports:
       - '8889:80'
      environment:
        PMA_HOST: mysql
```

And run ```docker-compose``` with ```--no-deps```

    $ docker-compose up -d --no-deps --build app
    Recreating phpmyadmin ... done

Thank you...
Additional: ```--no-deps``` is recommended added when one specifies run command in run configuration.
