+++
categories = ["computer"]
date = 2022-08-27T17:00:00Z
excerpt = "to show picture or image on ranger you need tools to covered them act. like w3m and uezerbug. In this case I'm try to install uezerbug and get fail"
tags = ["ranger"]
title = "pip failed install or build uezerbug (dependency needed for ranger show picture)"
type = "post"

+++
# To the conclusion

to build the uezerbug installation python-wheel is needed in this scenario. I'm to update wheel and it's still useless. Searching on the internet about this case

        ...
        
          Xshm/Xshm.c:7:10: fatal error: X11/extensions/XShm.h: No existe el fichero o el directorio
         #include <X11/extensions/XShm.h>
                  ^~~~~~~~~~~~~~~~~~~~~~~
        compilation terminated.
        error: command 'i686-linux-gnu-gcc' failed with exit status 1
        
        ...

and a quick googled search of the error pip message **_#include anycodings_pip <X11/extensions/XShm.h>_** revealed pip that you're missing the package, **libxext-dev**.

So, just 