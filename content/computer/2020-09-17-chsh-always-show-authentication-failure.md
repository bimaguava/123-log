+++
categories = ["computer"]
date = 2020-09-16T17:00:00Z
draft = true
excerpt = "This error is when I want to set default shell"
tags = ["linux-error"]
title = "2020-09-17: chsh always show \"Authentication failure\""
type = "post"

+++
### Main Problem

Error when I want to set default shell

    azureuser@arjuna:~$ chsh -s /usr/bin/fishPassword: chsh: PAM: Authentication failure

so, I change PAM Configuration that not ask password to change this shell. PAM config you can find in **/etc/pam.d/chsh**

    auth       required   pam_shells.so

to

    auth       sufficient   pam_shells.so

![](https://res.cloudinary.com/bimagv/image/upload/v1611564921/2020-09/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MHQfLubKnNJTm6XH_yt_2F-MHQoeepUxyy07QCgSL8_2FScreen_2020-09-17_17-52-09X_qz4azo.png)