+++
categories = ["sysadmin"]
date = 2021-03-30T17:00:00Z
excerpt = "such as try get images, run container and Creating a MySQL Database Instance"
tags = ["podman"]
title = "Fetching Container Images with Podman to Creating a MySQL Database Instance"
type = "post"

+++
### Preface

> getting started with podman

### Scenario

* Search for and fetch container images with Podman.
* Run and configure containers locally.
* Use the Red Hat Container Catalog.

### Getting images

Podman users can use the **search** subcommand to find available images from remote or local registries. "_`podman search rhel`_"

> Note:
>
> This classroom's Podman installation uses a several publicly available registries, like `Quay.io` and Red Hat Container Catalog.

After you have found an image, you can use Podman to download it. When using the **pull** subcommand, Podman fetches the image and saves it locally for future use:

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

Container images are named based on the following syntax:

registry_name/user_name/image_name:tag

> e.g:
>
> `podman pull registry.access.redhat.com/rhel:latest`

### Running containers

The **podman run** command runs a container locally based on an image. At a minimum, the command requires the name of the image to execute in the container.

The container image specifies a process that starts inside the container known as the _entry point_. The **podman run** command uses all parameters after the image name as the entry point command for the container. The following example starts a container from a Red Hat Enterprise Linux image. It sets the entry point for this container to the **echo "Hello world"** command.

    [root@workstation student]# sudo podman run ubi7/ubi:7.7 echo 'Hello!'
    Trying to pull registry.access.redhat.com/ubi7/ubi:7.7...
    Getting image source signatures
    Copying blob fcd63ccfdd0c done
    Copying blob 09dbbf8834d2 done
    Copying config 0355cd652b done
    Writing manifest to image destination
    Storing signatures
    Hello!

To start a container image as a background process, pass the `-d` option to the **podman run** command:

    [student@workstation ~]$ sudo podman run -d rhscl/httpd-24-rhel7:2.4-36.8
    009e9d587d603d6e123cd5044cd9fb8212669fee6f2a9d4c2feef5418370d0bc

And container just created and running

    [root@workstation student]# podman container ls
    CONTAINER ID  IMAGE                                                     COMMAND               CREATED        STATUS            PORTS  NAMES
    009e9d587d60  registry.access.redhat.com/rhscl/httpd-24-rhel7:2.4-36.8  /usr/bin/run-http...  5 minutes ago  Up 5 minutes ago         gracious_hawking

And use inspect command to show ip of container

    [root@workstation student]# podman inspect -l -f "{{.NetworkSettings.IPAddress}}" 
    10.88.0.3

Open [http://10.88.0.3:8080](http://10.88.0.3:8080)

![](https://res.cloudinary.com/bimagv/image/upload/v1617260132/2021-03/123/Screenshot_from_2021-04-01_13.54.47_wfzr74.png)