+++
categories = ["sysadmin"]
date = 2021-02-05T17:00:00Z
excerpt = "Just fixing this error"
tags = ["mysql-error"]
title = "MySQL service failed to start"
type = "post"

+++
### Preface

> I can't start MySQL service with new installation

### Main Problem

I opened **services.msc** and going to start service

![](https://res.cloudinary.com/bimagv/image/upload/v1612573771/2021-02/123/2021-01-24--T10-03-42_ws1mm0.png)

![](https://res.cloudinary.com/bimagv/image/upload/v1612574115/2021-02/123/2021-01-24--T10-30-40_vcx3fm.png)

That not started. just show not spesific message.

Or sometimes can be started.

![](https://res.cloudinary.com/bimagv/image/upload/v1612574266/2021-02/123/2021-01-24--T10-34-22_ulupzi.png)

But, it show the unconditional error when I remote with telnet like this screenshoot.

![](https://res.cloudinary.com/bimagv/image/upload/v1612574300/2021-02/123/2021-01-24--T10-41-18_mdbodp.png)

Also, not working when remote with MySQL Workbench.

![](https://res.cloudinary.com/bimagv/image/upload/v1612574398/2021-02/123/2021-01-24--T10-53-01_xrxujr.png)

Thats problem.

### Indication

Fail in installation of MySQL Server. It cause services not created perfectly. In the past, I installed MySQL Server full edition with Workbench. Maybe I will recomended to do installation in minimal edition (only MySQL Server). 

### Solved

Reinstall MySQL Server

![](https://res.cloudinary.com/bimagv/image/upload/v1612574628/2021-02/123/2021-01-24--T11-14-24_f1idnm.png)

Once the installation completed, it will be created new services (**MySQL80**) with Status "Started"

![](https://res.cloudinary.com/bimagv/image/upload/v1612574844/2021-02/123/2021-01-24--T11-45-10_tzqa8f.png)

Perfect!

How MySQL service to be remote?

![](https://res.cloudinary.com/bimagv/image/upload/v1612574917/2021-02/123/2021-01-24--T11-47-03_iepwuu.png)

It's running.

### Conclusion

Install first MySQL Server first, Workbench later.