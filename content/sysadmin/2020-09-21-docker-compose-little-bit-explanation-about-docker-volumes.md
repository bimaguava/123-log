---
type   : post
title  : "Docker volumes introduction - using volumes with compose & error"
date   : 2020-09-21T09:11:35+07:00
categories: [sysadmin]
tags      : [docker]

excerpt:
  little bit explanation about docker volumes
---

### Preface
>I don't know what is Docker volumes!

Okay docker! What is this hell the docker volumes before know this thing I have a problem using docker because docker we know run a container-container also known as ```database container```.

And that container has a f***** virtual file system in  ```/var/lib/<image>/data```. So, I cannot access, see directory folder without logged in to container.

I tell you that your project or your container has a virtual data or we can call it a **non-persistence data** which is not available after fully closing (delete) the container because the data stored in a virtual file system in a spesific container.

### Example
#### MySQL phpmyadmin
It means, in this case I need persistence local data for running the project with docker. in this case I use example from mysql and phpmyadmin. Look at this YAML file.

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
      service:
      volumes:
       - <your_dir_path>:/etc/mysql/conf.d
       - <your_dir_path>:/var/lib/mysql

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

I'm focus to mysql services to take an examples about Docker Volumes

When you install a MySQL container, you will find its configuration options in the **/etc/mysql/my.cnf**  and the data storage directory. So, I need mount my external directory inside the container.

**/etc/mysql/conf.d** = MySQL config file
**/var/lib/mysql** = Data storage

How to know that? let's inspect the container details!

```
$ docker inspect chatphpDB
...
        "Mounts": [
            {
                "Type": "volume",
                "Name": "05ea8c6cc5abbeba7d6962f108b3633d1011c272589a6b27fda1330e7971d9da",
                "Source": "/var/snap/docker/common/var-lib-docker/volumes/05ea8c6cc5abbeba7d6962f108b3633d1011c272589a6b27fda1330e7971d9da/_data",
                "Destination": "/var/lib/mysql",
                "Driver": "local",
                "Mode": "rw",
                "RW": true,
                "Propagation": ""
            },
...
```

Look! the mysql-data are stored in virtual File System (FS) container **/var/lib/mysql**

### Simple directory mounts

The simplest approach is mounting arbitrary host directory to container’s FS. My expectation is have a writable mounting system in my home folder.

#### Docker run command
    docker run -d \
    -v /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/conf.d:/etc/mysql/conf.d \
    -v /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/:/var/lib/mysql \
    --name chatphpDB \
    mysql

#### Docker compose
create **docker-compose.yml**
```
services:
   <application>:
      <some option>
...

      volumes:
       - /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/conf.d:/etc/mysql/conf.d
       - /home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/:/var/lib/mysql
```

Run with ```docker-compose up -d```

    $ docker-compose up -d
    Removing chatphpDB
    Recreating 3142d4446c38_chatphpDB ...
    WARNING: Service "db" is using volume "/var/lib/mysql" from the previous container. Host mapping "/home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/dockRecreating 3142d4446c38_chatphpDB ... done
    phpmyadmin is up-to-date

Now, we can inspect to know status of chatphpDB container

```
$ docker inspect chatphpDB
[
    {
        "Id": "b3bdd7c099e8e82f5e4c7cb24815f2bdfa4c9c1884c2866de00419d015a2e563",
        "Created": "2020-09-21T19:02:18.444355762Z",
        "Path": "docker-entrypoint.sh",
        "Args": [
            "mysqld"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 4601,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2020-09-21T19:02:20.395048624Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },

...

        "Mounts": [
            {
                "Type": "volume",
                "Name": "05ea8c6cc5abbeba7d6962f108b3633d1011c272589a6b27fda1330e7971d9da",
                "Source": "/var/snap/docker/common/var-lib-docker/volumes/05ea8c6cc5abbeba7d6962f108b3633d1011c272589a6b27fda1330e7971d9da/_data",
                "Destination": "/var/lib/mysql",
                "Driver": "local",
                "Mode": "rw",
                "RW": true,
                "Propagation": ""
            },
            {
                "Type": "bind",
                "Source": "/home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/conf.d",
                "Destination": "/etc/mysql/conf.d",
                "Mode": "rw",
                "RW": true,
                "Propagation": "rprivate"
            }

```

volumes.... it's working!

    ...
    "Source": "/home/bima/Workspace/Project_iseng_PHP/Chat_with_php_jquery_ajax/docker/chatphpDB/conf.d",
    "Destination": "/etc/mysql/conf.d",
    ...

### Examine my case
Whooops.. I set two volumes to mount, but the one not changes.. we will back again (^_^)

See MySQL database storage in virtual file system in my container! login with command ```docker exec -t -i chatphpDB /bin/bash```

    root@b3bdd7c099e8:/var/lib/mysql# ls
    '#ib_16384_0.dblwr'   auto.cnf	      binlog.000004   binlog.000008   client-cert.pem   ib_logfile1   mysql.ibd		   server-cert.pem   undo_002
    '#ib_16384_1.dblwr'   binlog.000001   binlog.000005   binlog.index    client-key.pem    ibdata1       performance_schema   server-key.pem
    '#innodb_temp'	      binlog.000002   binlog.000006   ca-key.pem      ib_buffer_pool    ibtmp1	      private_key.pem	   sys
    asd		      binlog.000003   binlog.000007   ca.pem	      ib_logfile0       mysql	      public_key.pem	   undo_001

Then see what in my external mounted file. not showing a mounted data directory from **/var/lib/mysql**

    $ pwd
    docker/chatphpDB/
    $ ls
    conf.d/

#### How to solve my case
Read from this article
- [mysql docker container](https://phoenixnap.com/kb/mysql-docker-container)
- [mysql docker containers: understanding basics](https://severalnines.com/database-blog/mysql-docker-containers-understanding-basics)
