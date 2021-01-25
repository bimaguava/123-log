+++
categories = ["computer"]
date = 2020-09-20T17:00:00Z
excerpt = "Run bash in Windows Command Prompt using msys2"
tags = ["msys2"]
title = "Running bash in CMD with msys2"
type = "post"

+++
### Main Idea
>Run bash in Windows Command Prompt using msys2

### Requisite
- msys2 (https://www.msys2.org/wiki/MSYS2-installation/)

This extremely simple way to get bash. Just download msys2 and then add msys2 path

### Add Path
#### Win 7
    C:\msys32\usr\bin;C:\msys32\usr\local\bin;

#### Win 10
    C:\msys32\usr\bin
    C:\msys32\usr\local\bin

Adding this path to make msys2 available everywhere, you need to add them to the “Path” variable like this:

- Open the Run box by pressing **Windows + R**, and type in **systempropertiesadvanced**.
- Click on the **“Environment Variables”** button.
- In the **“System Variables”** section, scroll down and double-click on the **“Path”** variable.
- If you’re on Windows 7/8, add the text ```C:\msys32\usr\bin;C:\msys32\usr\local\bin;``` to the beginning of the variable value. If you’re on Windows 10, add the ```C:\msys32\usr\bin and C:\msys32\usr\local\bin``` folders to the list, and move these two entries to the top.

That's all.

### Reference
-  [get-unix-environment windows](https://www.booleanworld.com/get-unix-linux-environment-windows-msys2/)
