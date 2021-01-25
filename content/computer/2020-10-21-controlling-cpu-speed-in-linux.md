+++
categories = ["computer"]
date = 2020-10-20T17:00:00Z
excerpt = " I want to use lowest frequency so just use indicator-cpufreq "
tags = ["linux-tips"]
title = "Controlling CPU speed in Linux"
type = "post"

+++
### To the point

Before my CPU speed 28xx.xxx. In this case, I want to control to lower speed. Because system crashing or overload in my laptop. use `lscpu | more` to show the information

    CPU MHz:             2890.728CPU max MHz:         3200,0000

I using `indicator-cpufreq` (install with apt`sudo apt install indicator-cpufreq`) and I want to use lowest frequency so just use this command

    sudo cpufreq-set -g powersave

and my speed will be

    CPU MHz:             1798.955CPU max MHz:         3200,0000CPU min MHz:         800,0000

If you want to scale just change the option to **-f**