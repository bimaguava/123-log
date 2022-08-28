+++
categories = ["computer"]
date = 2022-08-27T17:00:00Z
excerpt = "to show picture or image on ranger you need tools to covered them act. like w3m and uezerbug. In this case I'm try to install uezerbug and get fail"
tags = ["ranger"]
title = "pip failed install or build uezerbug (dependency needed for ranger show picture)"
type = "post"

+++
# To the conclusion

to build the uezerbug installation python-wheel is needed in this scenario. I'm trying to update wheel and it's still useless. Searching on the internet about this case

        ...
        
          Xshm/Xshm.c:7:10: fatal error: X11/extensions/XShm.h: No existe el fichero o el directorio
         #include <X11/extensions/XShm.h>
                  ^~~~~~~~~~~~~~~~~~~~~~~
        compilation terminated.
        error: command 'i686-linux-gnu-gcc' failed with exit status 1
        
        ...

and a quick googled search of the error pip message **_#include anycodings_pip <X11/extensions/XShm.h>_** revealed pip that you're missing the package, **libxext-dev**.

So, just

    sudo apt install libext-dev

and try again

    pip install ueberzug
    Defaulting to user installation because normal site-packages is not writeable
    Collecting ueberzug
      Using cached ueberzug-18.1.9.tar.gz (36 kB)
      Preparing metadata (setup.py) ... done
    Requirement already satisfied: python-xlib in /home/ok/.local/lib/python3.11/site-packages (from ueberzug) (0.31)
    Requirement already satisfied: pillow in /home/ok/.local/lib/python3.11/site-packages (from ueberzug) (9.2.0)
    Requirement already satisfied: docopt in /home/ok/.local/lib/python3.11/site-packages (from ueberzug) (0.6.2)
    Requirement already satisfied: attrs>=18.2.0 in /home/ok/.local/lib/python3.11/site-packages (from ueberzug) (22.1.0)
    Requirement already satisfied: six>=1.10.0 in /home/ok/.local/lib/python3.11/site-packages (from python-xlib->ueberzug) (1.16.0)
    Building wheels for collected packages: ueberzug
      Building wheel for ueberzug (setup.py) ... done
      Created wheel for ueberzug: filename=ueberzug-18.1.9-cp311-cp311-linux_x86_64.whl size=52662 sha256=7f8a3bfba56afef1ee69d929e8debf491b568fc70d03362a0652250bd5560396
      Stored in directory: /home/ok/.cache/pip/wheels/49/32/5b/7039502703367727fe407fe132757a9db8d4cd7e1ae5891215
    Successfully built ueberzug
    Installing collected packages: ueberzug
      WARNING: The script ueberzug is installed in '/home/ok/.local/bin' which is not on PATH.
      Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
    Successfully installed ueberzug-18.1.9

ok great.

Let's update ranger configuration on \~/.config/ranger/rc.conf

    set preview_images true
    set preview_images_method  ueberzug 

# Source

* [https://www.anycodings.com/1questions/840232/pip3-failed-to-build-ueberzug](https://www.anycodings.com/1questions/840232/pip3-failed-to-build-ueberzug "https://www.anycodings.com/1questions/840232/pip3-failed-to-build-ueberzug")
* [https://askubuntu.com/questions/1222930/image-preview-doesnt-work-in-ranger](https://askubuntu.com/questions/1222930/image-preview-doesnt-work-in-ranger "https://askubuntu.com/questions/1222930/image-preview-doesnt-work-in-ranger")