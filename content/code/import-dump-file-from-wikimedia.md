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

But, in my machine (X220) need about **3 days** and it still not completed :v I think thereis not only one way to import sql data. I mean It should be import with another setup such as innoDB.

In wiki case, I'm just using a spesific dump file in xml. I think it doesn't need extra long time as an example.

### Example dump file in xml

### 

### Reference

* [https://en.wikipedia.org/wiki/Wikipedia:Database_download](https://en.wikipedia.org/wiki/Wikipedia:Database_download "https://en.wikipedia.org/wiki/Wikipedia:Database_download")
* [https://dumps.wikimedia.org/enwiki/20201101/](https://dumps.wikimedia.org/enwiki/20201101/ "https://dumps.wikimedia.org/enwiki/20201101/")
* [https://serverfault.com/questions/137965/how-do-i-load-a-sql-gz-file-to-my-database-importing](https://serverfault.com/questions/137965/how-do-i-load-a-sql-gz-file-to-my-database-importing "https://serverfault.com/questions/137965/how-do-i-load-a-sql-gz-file-to-my-database-importing")
* [https://www.mediawiki.org/wiki/Manual:Restoring_a_wiki_from_backup](https://www.mediawiki.org/wiki/Manual:Restoring_a_wiki_from_backup "https://www.mediawiki.org/wiki/Manual:Restoring_a_wiki_from_backup")