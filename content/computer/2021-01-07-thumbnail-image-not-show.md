+++
categories = ["computer"]
date = 2021-01-06T17:00:00Z
draft = true
excerpt = "method how to solve thumbnail images not showing in explorer file manager"
tags = ["windows-error"]
title = "2021-01-07 thumbnail image not show"
type = "post"

+++
### Main idea

Theris many method, look reference in bottom!

> method how to solve thumbnail images not showing in explorer file manager

### One is actually work (Edit Group Policy)

To Enable or Disable Thumbnail Previews in Group Policy **NOTE:** You must be logged in as an **administrator** to be able to do this option.

**1.** Open the [**all users**](https://www.sevenforums.com/tutorials/3652-local-group-policy-editor-open.html), [**specific users or groups**](https://www.sevenforums.com/tutorials/151415-group-policy-apply-specific-user-group.html), or [**all users except administrators**](https://www.sevenforums.com/tutorials/101869-local-group-policies-apply-all-users-except-administrators.html) **Local Group Policy Editor** for how you want this policy applied. **2.** In the left pane, click on the arrow to expand **User Configuration**, **Administrative Templates**, **Windows Components**, and **Windows Explorer** (Windows 7) or **File Explorer** (Windows 8). (see screenshot below)

![](https://res.cloudinary.com/bimagv/image/upload/v1611564585/2020-12/Group_Policy_c2azxl.jpg)

**3.** In the right pane of **Windows Explorer** (Windows 7) or **File Explorer** (Windows 8), double click/tap on **Turn off the display of thumbnails and only display icons** to edit it. (see screenshot above) **4.** Do **step 5 or 6** below for what you would like to do. **5. To Enable Thumbnails**

A) Select (dot) **Not Configured** or **Disabled**, and go to **step 7** below. (see screenshot below step 7) **NOTE: Not Configured** is the default setting.

**6. To Disable Thumbnails**

A) Select (dot) **Enabled**, and go to **step 7** below. (see screenshot below step 7)

**7.** Click/tap on **OK**. (See screenshot below)

![](https://res.cloudinary.com/bimagv/image/upload/v1611564725/2020-12/Poperties_hm0jdb.jpg)

**8.** Close the Local Group Policy Editor.

That's all.

### Reference

* [https://www.sevenforums.com/tutorials/11738-thumbnail-previews-enable-disable.html](https://www.sevenforums.com/tutorials/11738-thumbnail-previews-enable-disable.html "https://www.sevenforums.com/tutorials/11738-thumbnail-previews-enable-disable.html")