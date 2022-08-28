+++
categories = ["computer"]
date = 2022-08-27T17:00:00Z
excerpt = "Installation and set Python3.11 as a default alongside Python3.10"
tags = ["python"]
title = "Python3.11 on Ubuntu 22.04 LTS"
type = "post"

+++
I'm guarantee this way is the best way (for me) to install a newer version of Python without adding ppa or 3rd repository's shit. Do it your self man haha.

# Installation

    wget https://www.python.org/ftp/python/3.11.0/Python-3.11.0a7.tar.xz
    tar -xf Python-3.11.{version}.tar.xz
    sudo mv Python-3.11.{version} /opt/
    sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libsqlite3-dev libreadline-dev libffi-dev curl libbz2-dev pkg-config make -y
    cd /opt/Python-3.11.{version}/
    ./configure --enable-optimizations --enable-shared
    make
    sudo make altinstall
    sudo ldconfig /opt/Python-3.11.{version}
    

if ll is ok, we're go to setup default Python for our system

# Set

    sudo update-alternatives --install /usr/bin/python python /opt/Python-3.11.0a7/
    

s