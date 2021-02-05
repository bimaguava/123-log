+++
categories = ["computer"]
date = 2021-02-04T17:00:00Z
excerpt = "Method how to create persistance hirens boot in USB drive"
tags = ["windows-tips"]
title = "Create Windows To Go Live (persistence bootable USB) from Hirens iso"
type = "post"

+++
### Preface

> My USB drive need to be persistence to be working with hirens boot in case repairing pc

### Requirements

* Hirens boot PE iso
* GimagesX (It will allow you to work with WIM files from the Windows installation media and create a Windows To Go drive without needing the Microsoft’s official Windows-To-Go-creator tool, or the Windows AIK or ADK (Windows Assessment and Deployment Kit)
* Poweriso

### Steps

1. Extract hirens iso with **poweriso** or another program like that
2. Copy **_\\source\\boot.wim_** to media installation (USB drive) with **GimagesX**

   ![](https://res.cloudinary.com/bimagv/image/upload/v1612515586/2021-02/123/2021-02-05--T08-13-58_osmsik.png)

   ![](https://res.cloudinary.com/bimagv/image/upload/v1612515591/2021-02/123/2021-02-05--T07-59-13_mqeqzj.png)

   ![](https://res.cloudinary.com/bimagv/image/upload/v1612516015/2021-02/123/2021-02-05--T09-05-26_bbx1iv.png)
3. Ensure USB drive partition active! I need to make the Windows To Go partition active so my computer can boot from the **USB drive (F:)**. Just run **_compmgmt.msc_** to check it.

   ![](https://res.cloudinary.com/bimagv/image/upload/v1612516443/2021-02/123/2021-02-05--T09-12-03_oburfv.png)
4. Create Boot Files/Entries (UEFI and BIOS) to the USB Drive. Just run:

       F:
       cd \Windows\System32
       bcdboot.exe F:\Windows /s F: /f all

   ![](https://res.cloudinary.com/bimagv/image/upload/v1612517445/2021-02/123/2021-02-05--T09-29-31_ttjgbq.png)

   This error indicate the F: partition (my USB drive) is not completely actived. Because My drive/disk partition is not MBR disk. The partition can be ACTIVE only for fixed MBR disk. See this error message!

   ![](https://res.cloudinary.com/bimagv/image/upload/v1612518529/2021-02/123/2021-02-05--T09-43-36_khhlq2.png)

   **Solved:**
5. The **\\EFI\\** directory with the boot files is created on the root of F:

   That's all.
6. Booting.

### Source

* Windows To Go ssing GimagesX (GUI) [https://consciousvibes.com/how-to-create-a-windows-to-go-live-bootable-usb-drive/](https://consciousvibes.com/how-to-create-a-windows-to-go-live-bootable-usb-drive/ "https://consciousvibes.com/how-to-create-a-windows-to-go-live-bootable-usb-drive/")