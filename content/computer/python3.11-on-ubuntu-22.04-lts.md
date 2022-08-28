+++
categories = ["computer"]
date = 2022-08-27T17:00:00Z
excerpt = "Installation and set Python3.11 as a default alongside Python3.10"
tags = ["python"]
title = "Python3.11 on Ubuntu 22.04 LTS"
type = "post"

+++
Long time not write some note in here... I know how important it is, documentation of work to read again on future as a timeline of work process. 

In this note I'm on fresh installation of Ubuntu 22.04 LTS (Linux Mint) on my X220. Now I'm just trying to install newer version of python. And I'm guarantee this way is the best way (for me) to install a newer version of Python without adding ppa or 3rd repository's shit. Do it your self man haha. You try it manual always is the best. Because, your know what you do on your machine. Your lovely machine. 

So, sure what gonna do

just like that :)

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

if all is ok, we're go to setup default Python for our system

# Setup

After installation, were gonna select Python 3.11 path on 

> /opt/Python-3.11.0a7

to create executable path to run **python** command on terminal

    sudo update-alternatives --install /usr/bin/python python /opt/Python-3.11.0a7/

After that, you can uninstall old version of python you run before and their python3-pip. Or just leaving that.

## Python-pip setup

    python -m pip install --upgrade pip setuptools wheel
    Defaulting to user installation because normal site-packages is not writeable
    Requirement already satisfied: pip in /usr/local/lib/python3.11/site-packages (22.0.4)
    Collecting pip
      Downloading pip-22.2.2-py3-none-any.whl (2.0 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 2.0/2.0 MB 2.6 MB/s eta 0:00:00
    Requirement already satisfied: setuptools in /usr/local/lib/python3.11/site-packages (58.1.0)
    Collecting setuptools
      Using cached setuptools-65.3.0-py3-none-any.whl (1.2 MB)
    Collecting wheel
      Downloading wheel-0.37.1-py2.py3-none-any.whl (35 kB)
    Installing collected packages: wheel, setuptools, pip
      WARNING: The script wheel is installed in '/home/ok/.local/bin' which is not on PATH.
      Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
      WARNING: The scripts pip, pip3 and pip3.11 are installed in '/home/ok/.local/bin' which is not on PATH.
      Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
    Successfully installed pip-22.2.2 setuptools-65.3.0 wheel-0.37.1
    WARNING: You are using pip version 22.0.4; however, version 22.2.2 is available.
    You should consider upgrading via the '/usr/bin/python -m pip install --upgrade pip' command.

check where pip on python-3.11 folder

    whereis pip3.11
    pip3.11: /usr/local/bin/pip3.11

and