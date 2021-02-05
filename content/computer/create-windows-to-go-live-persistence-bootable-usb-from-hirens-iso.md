+++
categories = ["computer"]
date = 2021-02-04T17:00:00Z
draft = true
excerpt = "Method how to create persistance hirens boot in USB disk"
tags = ["windows-tips"]
title = "Create Windows To Go Live (persistence bootable USB) from Hirens iso"
type = "post"

+++
### Preface

> My USB disk need to be persistence to be working with hirens boot in case repairing pc

### Reading

* Windows To Go ssing GimagesX (GUI) [https://consciousvibes.com/how-to-create-a-windows-to-go-live-bootable-usb-drive/](https://consciousvibes.com/how-to-create-a-windows-to-go-live-bootable-usb-drive/ "https://consciousvibes.com/how-to-create-a-windows-to-go-live-bootable-usb-drive/")
* Windows AIK [https://www.youtube.com/watch?v=sCX39ADVLHY](https://www.youtube.com/watch?v=sCX39ADVLHY "https://www.youtube.com/watch?v=sCX39ADVLHY")

### Requirements

* Hirens boot PE iso
* GimagesX (It will allow you to work with WIM files from the Windows installation media and create a Windows To Go drive without needing the Microsoft’s official Windows-To-Go-creator tool, or the Windows AIK or ADK (Windows Assessment and Deployment Kit)
* Poweriso

### Steps

* extract hirens iso with poweriso or another program like that
* Copy **\\source\\boot.wim** to media installation (USB disk) with **GimagesX**