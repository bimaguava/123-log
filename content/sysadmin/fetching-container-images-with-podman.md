+++
categories = ["sysadmin"]
date = 2021-03-30T17:00:00Z
excerpt = "Fetching Container Images with Podman"
tags = ["podman"]
title = "Fetching Container Images with Podman"
type = "post"

+++
### Preface

> getting started with podman

### Getting images

    [root@workstation student]# podman pull rhel
    Trying to pull registry.access.redhat.com/rhel...
    Getting image source signatures
    Copying blob b77bb434db5a done
    Copying blob 91592046c71b done
    Copying config c61e4f9e8a done
    Writing manifest to image destination
    Storing signatures
    c61e4f9e8adadac1824f46868b670f06f4a4c66f7043eaf4a68194af4d9097bc
    
    [root@workstation student]# podman images
    REPOSITORY                        TAG      IMAGE ID       CREATED       SIZE
    registry.access.redhat.com/rhel   latest   c61e4f9e8ada   2 weeks ago   216 MB