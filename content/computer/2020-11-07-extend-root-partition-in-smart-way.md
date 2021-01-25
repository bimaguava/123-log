+++
categories = []
date = ""
draft = true
excerpt = ""
tags = []
title = "2020-11-07 Extend root partition in smart way"
type = "post"

+++
### To the point

The thing is resize other partition and add to right (otherside root partition) partition.

But, the problem you know using Linux's WTF tools is harder than anything. Becase I lazier, don't use complicated command and I avoid risk of lost any data on my hardisk or partition.

### What's Method?

First, what is the method? It's simple

1. resize "big partition" in your hardisk to get deleted or free partitions section
2. slide the into **right side** root partition
3. after that you can resize or extend the root partition

### What's tool?

Second, whats tool?

1. aomei partition assistant pro **NO, but can be used for resize your NTFS and slide them to right side of root partition**
2. ~~acronis disk director~~ _(Not support EXT4)_
3. ~~easeus partition crack version~~ _(to long process or I don't know maybe it stuck :v)_
4. paragon partition manager **YES _(you can use this)_**

> NOTE!

Paragon actually can't resize Linux partition in this case EXT4 **if the partitions is "your Linux File System"** It means if root take the space from home partition (in case /home is your right side) Its not work.

### Let's see!

#### Resize NTFS partition & slide to right-side of /root

Let's switch to Windows now, Here I'm resize NTFS partition and will slide to the right-side of /root.

to complete process takes 1 hour in old thinkpad X220

![](https://res.cloudinary.com/bimagv/image/upload/v1611565234/2020-11/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MLWXzXSXHJrREwjmwrR_2F-MLWYmhZHsVKguHq34Gq_2F7BV3U63ErD_puael1.png)

#### Result

![](https://res.cloudinary.com/bimagv/image/upload/v1611565360/2020-11/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MLWXzXSXHJrREwjmwrR_2F-MLW_MV2U2B_TjEUas5h_2Fc6OYtLBPES_xzuzm2.png)

### Create deleted partition to EXT4

After that create EXT4 Partition. It's just click **Create partitions** in left Aomei window and select **EXT4** Filesystem  
![](https://res.cloudinary.com/bimagv/image/upload/v1611565486/2020-11/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MLWXzXSXHJrREwjmwrR_2F-MLWbClyl-zJ8REEICwy_2F9WYAyDuJsn_dkv0an.png)

Wait a minute and okay... we got this!

### Extend root partition

Now open **Paragon Partition manager 17 CE** and extend the root partitions like this

![](https://res.cloudinary.com/bimagv/image/upload/v1611565555/2020-11/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MLWXzXSXHJrREwjmwrR_2F-MLWcnCYtr2ujuvyuYTB_2FhJ16XiOMrS_mzet3w.png)

And this is the time!...to ENTER

and boom! 🤪