+++
categories = ["computer"]
date = 2020-12-02T17:00:00Z
draft = true
excerpt = "Increase volume till 150 with DynamiQ + EqualizerAPO64-1.2.1"
tags = ["windows-tips"]
title = "Increase volume X220 in Windows System"
type = "post"

+++
### Preface

Btw, I'm unlike other most people 😘 . Because when I'm looking for tools or utility sometimes using the keyword "tools to make gif in windows **github**" or "best video editor windows **open source**". So that, I got many alternative software. It's also "_called searching software in geek way"_ 😍

### DFX is SUCK

So many time I'm searching for increase volume in Windows 7. But I'm still using software called DFX blabla...bla wa hmm.. whatever. Now, I don't use them again because it looks like winamp haha.

### Solution: DynamiQ + EqualizerAPO64-1.2.1

So, this is the good things, [https://github.com/Brad331/DynamiQ](https://github.com/Brad331/DynamiQ "https://github.com/Brad331/DynamiQ")

Btw, **DynamiQ** is not software, it is config!

the software is actually just like an `equalizer editor` it's very simple to use.

> _What is exactly DynamiQ?_

package of scripts that allow you to boost the volume of the audio from your Windows device. It enables you to use aggressive equalizer settings without sacrificing maximum attainable volume.

> _What is EqualizerAPO?_

this is tools to manage config you can get this from [here](https://sourceforge.net/projects/equalizerapo/files/1.2.1/EqualizerAPO64-1.2.1.exe/download?use_mirror=nchc&r=https%3A%2F%2Fsourceforge.net%2Fprojects%2Fequalizerapo%2F&use_mirror=udomain).

Just install from executable file.

_How to Open EqualizerAPO GUI?_

> C:\\Program Files\\EqualizerAPO\\Editor.exe

### How to config DynamiQ and EqualizerAPO?

First, download source file from [https://github.com/Brad331/DynamiQ/archive/master.zip](https://github.com/Brad331/DynamiQ/archive/master.zip "https://github.com/Brad331/DynamiQ/archive/master.zip")

and move it to

> C:\\Program Files\\EqualizerAPO\\config\\DynamiQ-master

And then, open Equializer APO and insert DynamiQ config. Its called **DynamiQ.txt**

![](https://res.cloudinary.com/bimagv/image/upload/v1611562958/2020-12/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MNc27BFCAY7FTNHOY5u_2F-MNc3Tz9iJMjfpVI1tgC_2FInclude_20DynamiQ_xmnypg.png)

### Result

![](https://res.cloudinary.com/bimagv/image/upload/v1611563216/2020-12/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MNc4kAu8c93GdWyb37A_2F-MNc65wz-SgVTv_nstMm_2Fequalizerapo_e2xifj.gif)

after that save configuration with **Ctrl + s**

### Examine a problem

This configuration is not running after the machine reboot, the solution is [https://github.com/Brad331/APOpreamp.ahk/releases](https://github.com/Brad331/APOpreamp.ahk/releases "https://github.com/Brad331/APOpreamp.ahk/releases")

First, move APOpreamp.exe to

> C:\\Users\\Administrator\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup

and reboot.

Test your maximum volume with enter **+ (plus indicator)** in keyboard. It's working!