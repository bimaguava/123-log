+++
categories = ["computer"]
date = 2020-12-06T17:00:00Z
excerpt = "Setup ShareX for screen/audio recorder"
tags = ["sharex"]
title = "Use shareX as Screen Recorder (FFmpeg included)"
type = "post"

+++
### Main Idea

> Setup ShareX for screen/audio recorder

### FFmpeg (audio setup)

First, get ffmpeg build file for windows. Download from https://github.com/BtbN/FFmpeg-Builds/releases

Extract and move to `C:\ffmpeg`  (just rename the folder like that). Now, you should add new path in **Advanced system setting**. Add new path for **System variable** like this:

![](https://res.cloudinary.com/bimagv/image/upload/v1611552445/2020-12/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MNvm7Z38AvE2cV09BDG_2F-MNvu9nP2yomQVXPhpB4_2FlvVQtPU_iaw4j8.png)

### Test Run

![](https://res.cloudinary.com/bimagv/image/upload/v1611552460/2020-12/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MNvm7Z38AvE2cV09BDG_2F-MNvueW8PmmEY2iIRWle_2FRavbjK9_nbt65a.png)

### Setup ffmpeg path

After adding ffmpeg to your path, but ShareX cannot automaticly detect ffmpeg to use as their audio source. We should update folder of installations ffmpeg manually like this.

#### 1. Choose Task Settings>Screen recorder>Screen recording options

![](https://res.cloudinary.com/bimagv/image/upload/v1611552475/2020-12/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MNvm7Z38AvE2cV09BDG_2F-MNvqgLcbZzLdiMVh3zO_2Fuh2xM82_ltv6td.png)

#### 2.  Change ffmpeg path

![](https://res.cloudinary.com/bimagv/image/upload/v1611552546/2020-12/assets_2F-M5dP2bvOEMvK2A_oymi_2F-MNvw4azUUlrZi54phi9_2F-MNvxJvnO9bzA2KmlQRa_2F578VOJF_axq1am.png)

### How to Screen recording?

* **Ctrl + Shift + PrtSc** recording render to gif (start and stop)
* **Ctrl + PrtSc** normal recording output mp4 (start and stop)