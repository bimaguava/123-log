---
type   : post
title  : "Docker Portainer - linked phpmyadmin to mySQL database (Setup Environment variables)"
date   : 2020-09-20T09:10:35+07:00
categories: [sysadmin]
tags      : [docker, portainer]

excerpt:
  Add Env variables in Portainer
---

### Preface
>Main idea: Add Env variables in Portainer

### Reading
fundamentals
- [Environment variables in docker run](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file)
- [Environment variables in Compose](https://docs.docker.com/compose/environment-variables/)

### Environment variables

What is Docker environment variable?

>Set **environment variables** (-e, --env, --env-file)

When running the command, the Docker CLI client checks the value the variable has in your local environment and passes it to the container. If no = is provided and that variable is not exported in your local environment, the variable won't be set in the container.

I need to set an environment (ENV) to connect/linked phpmyadmin to mySQL database

- **PMA_HOST**: <service name> (is not container name!)
- **PMA_PORT**: <port>

![](https://res.cloudinary.com/bimagv/image/upload/v1608739118/2020-09/2020-09-20-linked-phpmyadmin-to-mysql-in-docker.png)
