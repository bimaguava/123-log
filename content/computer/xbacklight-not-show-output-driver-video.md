+++
categories = ["computer"]
date = 2022-05-05T17:00:00Z
excerpt = "Xbacklight not show output /driver video"
tags = ["xbacklight"]
title = "Xbacklight not show output /driver video"
type = "post"

+++
basicly, you can find your driver video on /sys/class/backlight

and just give value for executables path to running persen of light on your screen

    [root@pingu ok]# echo > 90 /sys/class/backlight/intel_backlight/brightness

in case I use xbacklight and this error still show

    [root@pingu ok]# xbacklight
    No outputs have backlight property

So, the elegant solution is using acpilight tool, you can find it on AUR. Acpilight script will be fixed this shit.

just install and try your xbacklight now. Hope this can help