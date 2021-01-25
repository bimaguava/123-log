+++
categories = ["computer"]
date = 2020-11-22T17:00:00Z
draft = true
excerpt = "It's just working to move installed program (C:\\Program Files) to another space using robocopy"
tags = ["windows-tips"]
title = "Moving installed program to Local Disk D"
type = "post"

+++
### Requisite

Windows 7 OS

### Main idea

> move installed program with 2 tools, `robocopy` and `mklink` .

### Action!

This way just need 2 tools, `robocopy` and `mklink` . Example:

> robocopy "**source**" "**destination**" /sec /move /e

the source is your default application folder e.g: `C:\Program Files (x86)\AOMEI Partition Assistant` and destination in my case `D:\System Programs\Wedus\Program Files\AOMEI Partition Assistant `. This command will be move the folder. After that we need create symlink with command

> mklink "**source**" "**destination**" /j

Easy... without any software, just need command prompt!

![](https://res.cloudinary.com/bimagv/image/upload/v1611564019/2020-12/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MMoQhhENioG-S50TLev_2F-MMoU7UlB4EJjUyj8C0E_2FppSx0plguR_cjqzrl.png)