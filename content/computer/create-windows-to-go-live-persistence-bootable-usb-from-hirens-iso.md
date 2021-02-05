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

   It's already actived. But in diskpart it show an error.

   ![](https://res.cloudinary.com/bimagv/image/upload/v1612518529/2021-02/123/2021-02-05--T09-43-36_khhlq2.png)

   **Solved:** My USB Drive partition type is GPT. It's need to be converted!

   ![](https://res.cloudinary.com/bimagv/image/upload/v1612519165/2021-02/123/2021-02-05--T09-55-19_qud96u.png)

   ![](https://res.cloudinary.com/bimagv/image/upload/v1612519205/2021-02/123/2021-02-05--T09-57-40_i9koaa.png)
4. Copy EFI & boot to usb drive using bcdboot. It will create new directory name **/EFI/** in the root of USB drive

       F:
       cd \Windows\System32
       bcdboot.exe F:\Windows /s F: /f all

   **_ERROR:_** Something wrong with boot file in hirens.
5. Booting.

### Source

* Windows To Go ssing GimagesX (GUI) [https://consciousvibes.com/how-to-create-a-windows-to-go-live-bootable-usb-drive/](https://consciousvibes.com/how-to-create-a-windows-to-go-live-bootable-usb-drive/ "https://consciousvibes.com/how-to-create-a-windows-to-go-live-bootable-usb-drive/")