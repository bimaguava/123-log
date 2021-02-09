+++
categories = ["code"]
date = 2021-02-07T17:05:00Z
excerpt = "importing mediawiki templatelinks dump to own wiki"
tags = ["wiki"]
title = "Import dump file (sql file) from mediawiki"
type = "post"

+++
### Preface

> importing mediawiki templatelinks dump to own wiki

### Remote my wiki database

    ↪ mysql -u root -h 172.24.0.2 -p
    Enter password: 
    Welcome to the MySQL monitor.  Commands end with ; or \g.
    Your MySQL connection id is 798
    Server version: 5.5.5-10.5.8-MariaDB-1:10.5.8+maria~focal mariadb.org binary distribution
    
    Copyright (c) 2000, 2021, Oracle and/or its affiliates.
    
    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.
    
    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

look the database

    mysql> use my_wiki
    Reading table information for completion of table and column names
    You can turn off this feature to get a quicker startup with -A
    Database changed

### Reference

* [https://en.wikipedia.org/wiki/Wikipedia:Database_download](https://en.wikipedia.org/wiki/Wikipedia:Database_download "https://en.wikipedia.org/wiki/Wikipedia:Database_download")
* [https://dumps.wikimedia.org/enwiki/20201101/](https://dumps.wikimedia.org/enwiki/20201101/ "https://dumps.wikimedia.org/enwiki/20201101/")