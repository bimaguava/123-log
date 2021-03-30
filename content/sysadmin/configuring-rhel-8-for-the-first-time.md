+++
categories = ["sysadmin"]
date = 2021-03-29T17:00:00Z
excerpt = "Setup RHEL 8 VM from Red Hat Academy"
tags = ["rhel"]
title = "Setup RHEL 8 VM from Red Hat Academy"
type = "post"

+++
### Preface

How to setup Red Hat Enterprise for the first time use

### Start use

### Begining setup

#### Epel Repo

    sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm

![](https://res.cloudinary.com/bimagv/image/upload/v1617120563/2021-03/123/Screen_2021-03-30_23-05-16X_ffdw3a.png)

And update using _yum update_

![](https://res.cloudinary.com/bimagv/image/upload/v1617120579/2021-03/123/Screen_2021-03-30_23-05-43X_mrujcp.png)

#### Extras repositories

    sudo subscription-manager repos --enable "rhel-*-optional-rpms" --enable "rhel-*-extras-rpms"
    sudo yum update

#### ZeroTier for VPN connection

    sudo yum install snapd
    sudo systemctl enable --now snapd.socket
    sudo ln -s /var/lib/snapd/snap /snap