+++
categories = ["computer"]
date = 2022-01-23T17:00:00Z
excerpt = ""
tags = ["windows-error"]
title = "Error NET::ERR CERT DATE INVALID - Your connection is not private on Windows 7"
type = "post"

+++
## Preface

Beginning on September 24, 2022, some users might have encountered a _“Your connection is not private”_ or similar error message from their web browser when attempting to visit a website that uses a Let’s Encrypt SSL certificate. Make sure the ISRG Root X1 certificate and the Let’s Encrypt Intermediate Signed by ISRG Root X1 are installed in your OS.

## Fix: import ISRG Root X1 certificate