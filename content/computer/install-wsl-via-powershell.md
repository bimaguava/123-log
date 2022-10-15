+++
categories = ["computer"]
date = 2022-10-14T17:00:00Z
excerpt = "Install WSL via powershell"
tags = ["wsl"]
title = "Install WSL via powershell"
type = "post"

+++
## Let's start with my case

In this case, my version Windows is not same with other. In other words "lack" because of me. Maybe, I need an adjustment and more setup. So you can see what needed to install WSL and while minimizing errors happen. Sorry for my terrible english :)

So, what is needed if I'm install WSL in normal mode and cannot install WSL and download any distro on Microsoft Store?

Make sura that:

Install WSL on powershell

    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux

* Enable **_Windows Subsystem for Linux_** and **_Windows Virtual Machine Platform_** on **Windows Feature**
* Make sure you have Windows Store
* Windows Update
* **_Background Intellegent Transfer Service_** and **_WIndows Update_** is set to automatic or make sure they service is start on **Services**
* run **wsreset** in Administrator mode
* Reset the Microsoft Store on **App & Service**

But, in my reality this thing not solving my case. I'm still cannot install any distro on Microsoft Store and run installation with AppxBundle Ubuntu it just show the error: 

> app installation failed with error message: catastrophic failure (0x8000ffff)

So, Windows fak you.

## Let's move

Basically, I'm just running a little bit command in here. I can install Ubuntu WSL after this.

I read on [https://learn.microsoft.com/en-us/windows/wsl/install-on-server#enable-the-windows-subsystem-for-linux](https://learn.microsoft.com/en-us/windows/wsl/install-on-server#enable-the-windows-subsystem-for-linux "https://learn.microsoft.com/en-us/windows/wsl/install-on-server#enable-the-windows-subsystem-for-linux")

I thing I don't need Microsoft Store anymore

The procedure to install WSL and get Ubuntu distro WSL is:

Absolutely having WSL

    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux

Download Ubuntu or OS distribution that you need on [https://learn.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions](https://learn.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions "https://learn.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions").

After download clear, navigate to that file app and install with these command

    Add-AppxPackage .\"file_name.AppxBundle"

![](https://res.cloudinary.com/bimagv/image/upload/v1665851691/2022-10/123/powershell_3w0NR7qCFo_bmshjf.png)

Thanke youee