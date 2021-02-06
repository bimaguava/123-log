+++
categories = ["computer"]
date = 2021-02-04T17:00:00Z
excerpt = "I need to make iso from this to make deployment to other installation media"
tags = ["windows-tips", "windows-adk", "windows-aik"]
title = "How to make a WindowsPE boot CD and other interest link in below"
type = "post"

+++
### Preface

> Main idea: I need to make iso from this to make deployment to other installation media

**If I talk this in generally**, the things is how about current Windows services (7/8/10/Server) can be deploy to another VM/Machine to **replace**, **migrate**, or **make new installation** on fresh system.

In other needs **Windows Automatic Deployment** used to customize Windows images (.wim, .esd, etc) for large-scale deployment e.g: Virtualization, Server or Data Center.

In other needs **Windows Automatic Deployment** tools used to test the quality and performance of your system and applications running on it.

### Method

Depends on requirement and needs how to deploy the Windows system to another media installation.

#### Deploy using Windows 7 machine (Irrelavant in 2020)

Requiring Windows AIK (Assessment Installation Kit) it's about 2GB

Read:

* How to make a WindowsPE boot CD using command line [https://www.youtube.com/watch?v=sCX39ADVLHY](https://www.youtube.com/watch?v=sCX39ADVLHY "https://www.youtube.com/watch?v=sCX39ADVLHY") Final video they create .iso file and it can be copy to USB Drive and get ready for booting.

#### Deploy using Windows 10 machine (Recommended)

Requiring Windows ADK (Assessment and Deployment Kit) it's about 20MB and requiring 6.5GB space of hardisk to create workspace or Deployment Workbench.

Read:

* Create bootable usb from current Windows 10 using freemium tools (iSumsoft) or using ADK (maybe need 6.7GB Space to setup environment and Workbench :v) [https://www.isumsoft.com/windows-10/how-to-create-winpe-bootable-usb-disk.html](https://www.isumsoft.com/windows-10/how-to-create-winpe-bootable-usb-disk.html "https://www.isumsoft.com/windows-10/how-to-create-winpe-bootable-usb-disk.html")

### Interest link

* How to create, managing images file using MDT (Windows Server administration) [https://www.youtube.com/watch?v=oWRvQgCi4aI](https://www.youtube.com/watch?v=oWRvQgCi4aI "https://www.youtube.com/watch?v=oWRvQgCi4aI")
* Debloat Windows 10 with customize images [https://www.youtube.com/watch?v=PdKMiFKGQuc](https://www.youtube.com/watch?v=PdKMiFKGQuc "https://www.youtube.com/watch?v=PdKMiFKGQuc")

Don't miss this!

* Create **autountended.xml** in Windows Server 2012 R2 [https://www.youtube.com/watch?v=n90Kli9u4CM](https://www.youtube.com/watch?v=n90Kli9u4CM "https://www.youtube.com/watch?v=n90Kli9u4CM")
* Unattended installation in Windows Server 2016 with ADK, MDT, & WDS [https://www.youtube.com/watch?v=McmNSsiud5E](https://www.youtube.com/watch?v=McmNSsiud5E "https://www.youtube.com/watch?v=McmNSsiud5E")