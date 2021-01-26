+++
categories = ["code"]
date = 2021-01-25T17:00:00Z
excerpt = "Create infobox in wiki page from stratch using lua script"
tags = ["wiki"]
title = "Create Infobox in wiki"
type = "post"

+++
### Main Idea

> Create infobox in wiki page from stratch using lua script

### Reading

* Syntax writing - [https://id.wikipedia.org/wiki/Templat:Infobox](https://id.wikipedia.org/wiki/Templat:Infobox "https://id.wikipedia.org/wiki/Templat:Infobox")
* CSS customization (in page-side) - [https://id.wikipedia.org/wiki/Templat:Infobox#Optional_CSS_styling](https://id.wikipedia.org/wiki/Templat:Infobox#Optional_CSS_styling "https://id.wikipedia.org/wiki/Templat:Infobox#Optional_CSS_styling")

### How to?

Create and submit this module and template

#### Template:Infobox

Source code: [https://bimagv.miraheze.org/w/index.php?title=Template:Infobox](https://bimagv.miraheze.org/w/index.php?title=Template:Infobox "https://bimagv.miraheze.org/w/index.php?title=Template:Infobox")

#### Module:Infobox

Source code: [https://bimagv.miraheze.org/w/index.php?title=Module:Infobox](https://bimagv.miraheze.org/w/index.php?title=Module:Infobox "https://bimagv.miraheze.org/w/index.php?title=Module:Infobox")

#### Module:Navbar

Source code: [https://bimagv.miraheze.org/w/index.php?title=Module:Navbar&action=edit](https://bimagv.miraheze.org/w/index.php?title=Module:Navbar&action=edit "https://bimagv.miraheze.org/w/index.php?title=Module:Navbar&action=edit")

### Example syntax infobox in wiki page

    {{Infobox
    |name    = Infobox/doc
    |title   = Test Infobox
    |image   = [[File:Bash.png|200px]]
    |caption = Caption for Bash.png
    
    |headerstyle  = background:#ccf;
    |labelstyle   = background:#ddf;
    
    |header1 = Header defined alone
    |label1  = 
    |data1   = 
    |header2 = 
    |label2  = Label defined alone
    |data2   = 
    |header3 = 
    |label3  = 
    |data3   = Data defined alone
    |header4 = All three defined (header)
    |label4  = All three defined (label)
    |data4   = All three defined (data)
    |header5 = 
    |label5  = Label and data defined (label)
    |data5   = Label and data defined (data)
    
    |belowstyle = background:#ddf;
    |below = Below text
    }}
    

### Result

![](https://res.cloudinary.com/bimagv/image/upload/v1611654717/2021-01/123/2021-01-26--T09-51-18_cc1gok.png)

That's all.