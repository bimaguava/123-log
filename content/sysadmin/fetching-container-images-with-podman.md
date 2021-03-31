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