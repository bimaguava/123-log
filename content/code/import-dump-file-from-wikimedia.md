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

Doing backup in wiki site is many option to extract the data. One of that is SQL database backup.

![](https://res.cloudinary.com/bimagv/image/upload/v1612859527/2021-02/123/Screen_2021-02-09_15-31-25X_meeknq.png)

So, I try with sql.gz file. it's about 3GB dump file.

![](https://res.cloudinary.com/bimagv/image/upload/v1613146520/2021-02/123/Screen_2021-02-12_06-27_eddinw.png)

But, in my machine (X220) need about 3 days and it still not completed :v I think thereis not only one way to import sql data.

In wiki case, I'm just extract a spesific data into the xml file. I think it doesn't need extra long time.

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

### 

### Reference

* [https://en.wikipedia.org/wiki/Wikipedia:Database_download](https://en.wikipedia.org/wiki/Wikipedia:Database_download "https://en.wikipedia.org/wiki/Wikipedia:Database_download")
* [https://dumps.wikimedia.org/enwiki/20201101/](https://dumps.wikimedia.org/enwiki/20201101/ "https://dumps.wikimedia.org/enwiki/20201101/")
* [https://serverfault.com/questions/137965/how-do-i-load-a-sql-gz-file-to-my-database-importing](https://serverfault.com/questions/137965/how-do-i-load-a-sql-gz-file-to-my-database-importing "https://serverfault.com/questions/137965/how-do-i-load-a-sql-gz-file-to-my-database-importing")
* [https://www.mediawiki.org/wiki/Manual:Restoring_a_wiki_from_backup](https://www.mediawiki.org/wiki/Manual:Restoring_a_wiki_from_backup "https://www.mediawiki.org/wiki/Manual:Restoring_a_wiki_from_backup")