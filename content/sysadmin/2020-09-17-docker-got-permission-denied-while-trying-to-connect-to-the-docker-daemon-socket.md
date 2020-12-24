---
type   : post
title  : "Error Docker - Got permission denied while trying to connect to the Docker daemon socket"
date   : 2020-09-17T09:17:35+07:00
categories: [sysadmin]
tags      : [docker error]

excerpt:
  Error hint is dial unix /var/run/docker.sock - permission denied
---

### Error hint
> dial unix /var/run/docker.sock: permission denied

### Information
error while create volume of ```portainer_data```. Because of this I can't open portainer web admin

    ~/bin ❯❯❯ docker volume create portainer_data

    Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.40/volumes/create: dial unix /var/run/docker.sock: connect: permission denied

### Solved!
    ~/bin ❯❯❯ sudo chmod 666 /var/run/docker.sock

finally

```
~/bin ❯❯❯ docker volume create portainer_data

portainer_data

~/bin ❯❯❯ docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer

Unable to find image 'portainer/portainer:latest' locally
latest: Pulling from portainer/portainer
d1e017099d17: Pull complete
717377b83d5c: Pull complete
Digest: sha256:f8c2b0a9ca640edf508a8a0830cf1963a1e0d2fd9936a64104b3f658e120b868
Status: Downloaded newer image for portainer/portainer:latest
cee680ca2af8c05cd9dbe61e3ee1d715feda9939891e5f5315e147d738846f35
```

![](https://res.cloudinary.com/bimagv/image/upload/v1608733261/2020-09/2020-09-17-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket.png)
