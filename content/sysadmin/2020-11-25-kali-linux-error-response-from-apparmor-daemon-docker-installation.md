+++
categories = ["sysadmin"]
date = 2020-11-24T17:00:00Z
excerpt = "Problem "
tags = ["kali-linux-error", "docker-error"]
title = "Kali Linux Error response from AppArmor Daemon (Docker installation)"
type = "post"

+++
### Main Problem

    root@kali:~# docker run hello-world
    docker: Error response from daemon: AppArmor enabled on system but the docker-default profile could not be loaded: running `/sbin/apparmor_parser apparmor_parser --version` failed with output: Failed to load features from '/usr/share/apparmor-features/features': No such file or directory

![](https://res.cloudinary.com/bimagv/image/upload/v1611572732/2020-11/assets_2F-MHKPiw3uTjFr4uX4wLs_2F-MMwZuKvLC7Kv3kcVxoi_2F-MMw_X-bBHkXCsO5cHVZ_2FScreen_2020-11-25_06-27_oo46cr.png)

### Try to solve

#### Searching to google

    running `/sbin/apparmor_parser apparmor_parser --version` failed with output: Failed to load features from '/usr/share/apparmor-features/features': No such file or directory

‌but no idea about this error message 🤪

#### My prediction

The problem is with Kali Linux, generally Debian system. Before I installed docker with snap so I need reference from this source about my problem.

any reference:

* [https://github.com/ONLYOFFICE/Docker-DocumentServer/issues/204](https://github.com/ONLYOFFICE/Docker-DocumentServer/issues/204 "https://github.com/ONLYOFFICE/Docker-DocumentServer/issues/204")
* [https://forum.snapcraft.io/t/docker-containers-not-working-on-debian-10-because-default-profile-is-not-loaded/14731](https://forum.snapcraft.io/t/docker-containers-not-working-on-debian-10-because-default-profile-is-not-loaded/14731 "https://forum.snapcraft.io/t/docker-containers-not-working-on-debian-10-because-default-profile-is-not-loaded/14731")

![](https://res.cloudinary.com/bimagv/image/upload/v1611572825/2020-11/assets_2F-MHKPiw3uTjFr4uX4wLs_2F-MMwc34L-Xrl7NdizQMi_2F-MMwhfwYDxETJGz5W_Qe_2FScreen_2020-11-25_07-03_dxnwlf.png)

So, fuck with them. Docker snap package is suck in Kali Linux. **Let's install docker from the official reference.**

#### Reading official documentation

![](https://res.cloudinary.com/bimagv/image/upload/v1611572935/2020-11/assets_2F-MHKPiw3uTjFr4uX4wLs_2F-MMwc34L-Xrl7NdizQMi_2F-MMwemKGq68tQzi4XRbj_2FScreen_2020-11-25_06-50_bofmez.png)  
Thereis avaliable debian system in official reference. But, Docker does **not offer any guarantees on untested and unsupported Debian distributions.** It will not work.

### Solved with simple line :v

First, uninstall docker from snap and Install from package [https://docs.docker.com/engine/install/debian/#install-from-a-package](https://docs.docker.com/engine/install/debian/#install-from-a-package "https://docs.docker.com/engine/install/debian/#install-from-a-package")

get package from [here](https://download.docker.com/linux/debian/dists/stretch/pool/stable/amd64/) and its requirement

* [containerd.io](https://download.docker.com/linux/debian/dists/stretch/pool/stable/amd64/containerd.io_1.2.0-1_amd64.deb)
* [docker-ce-cli](https://download.docker.com/linux/debian/dists/stretch/pool/stable/amd64/docker-ce-cli_18.09.0\~3-0\~debian-stretch_amd64.deb)
* [docker-ce](https://download.docker.com/linux/debian/dists/stretch/pool/stable/amd64/docker-ce_18.09.0\~3-0\~debian-stretch_amd64.deb)

install it all with `dpkg -i` and create symlink

After installation, run it

    systemctl start containerd
    systemctl enable containerd
    
    systemctl start docker
    systemctl enable docker

![](https://res.cloudinary.com/bimagv/image/upload/v1611573191/2020-11/assets_2F-MHKPiw3uTjFr4uX4wLs_2F-MMwxNbCJqSz-RFNEunL_2F-MMwxePK0XowH9gicyI4_2FScreen_2020-11-25_08-13_zicb8i.png)

It's just work.