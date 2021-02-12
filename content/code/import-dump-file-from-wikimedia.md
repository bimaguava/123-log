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

### Example dump file in SQL

Doing backup in wiki site is many option to extract the data. One of that is SQL database backup.

![](https://res.cloudinary.com/bimagv/image/upload/v1612859527/2021-02/123/Screen_2021-02-09_15-31-25X_meeknq.png)

So, I try with sql.gz file. it's about 3GB dump file.

* "Just import"

> zcat \[dumpfile.sql.gz\] | mysql -u \[user\] -h \[address\] -p \[database_name\]

![](https://res.cloudinary.com/bimagv/image/upload/v1613146520/2021-02/123/Screen_2021-02-12_06-27_eddinw.png)

Note: phpmyadmin can't do that :v (just <2GB)

*  Import with showing progress bar

    pv dump.sql.gz | zcat | mysql -u user -ppasswd database_name

f you've already started the import, you can execute this command in another window to see the current size of your databases. This can be helpful if you know the total size of the .sql file you're importing.

    watch 'echo "show processlist;" | mysql -uuser -ppassword';

If you want it less frequent then add `-n x` where _x_ is the number of seconds. 5 seconds would be:

    watch -n 5 'echo "show processlist;" | mysql -uuser -ppassword';

Wait....

How long I did?

in my machine (X220) need about **3 days** and it still not completed :v

I think thereis not only one way to import sql data. I mean It should be import with another setup such as innoDB.

### Example dump file in xml

#### Download Wikipedia Dump file (2.8GB)

    [vagrant@localhost www]$ cd
    [vagrant@localhost ~]$ wget https://dumps.wikimedia.org/jawiki/latest/jawiki-latest-pages-articles.xml.bz2

#### Upload the dump data to Mediawiki

Dry run

    [vagrant@localhost ~]$ php /var/www/mediawiki/maintenance/importDump.php --dry-run --conf /var/www/mediawiki/LocalSettings.php --server="http://192.168.33.10/" jawiki-latest-pages-articles.xml.bz2
    100 (246.16 pages/sec 246.16 revs/sec)
    200 (328.81 pages/sec 328.81 revs/sec)
    300 (345.88 pages/sec 345.88 revs/sec)
    400 (389.64 pages/sec 389.64 revs/sec)
    500 (433.00 pages/sec 433.00 revs/sec)
    600 (448.71 pages/sec 448.71 revs/sec)
    700 (475.27 pages/sec 475.27 revs/sec)
    800 (475.92 pages/sec 475.92 revs/sec)
    900 (481.52 pages/sec 481.52 revs/sec)
    1000 (489.51 pages/sec 489.51 revs/sec)
    ...
    2403900 (1056.31 pages/sec 1056.31 revs/sec)
    2404000 (1056.32 pages/sec 1056.32 revs/sec)
    Done!
    You might want to run rebuildrecentchanges.php to regenerate RecentChanges,
    and initSiteStats.php to update page and revision counts
    [vagrant@localhost ~]$ 

Formal run

    [vagrant@localhost ~]$ php /var/www/mediawiki/maintenance/importDump.php --conf /var/www/mediawiki/LocalSettings.php  --server="http://192.168.33.10/" jawiki-latest-pages-articles.xml.bz2 

This will take forever, like few days to complete for a large dump. Alternatively, you can try other dump data from [Wikimedia Downloads](https://dumps.wikimedia.org/backup-index.html).

### Reference

Download database or dump file in indonesia

* [https://id.wikipedia.org/wiki/Wikipedia:Unduh_basis_data#idwiki-pages-articles.xml](https://id.wikipedia.org/wiki/Wikipedia:Unduh_basis_data#idwiki-pages-articles.xml "https://id.wikipedia.org/wiki/Wikipedia:Unduh_basis_data#idwiki-pages-articles.xml")

Download database or dump file (english contents)

* [https://en.wikipedia.org/wiki/Wikipedia:Database_download](https://en.wikipedia.org/wiki/Wikipedia:Database_download "https://en.wikipedia.org/wiki/Wikipedia:Database_download")
* [https://dumps.wikimedia.org/enwiki/20201101/](https://dumps.wikimedia.org/enwiki/20201101/ "https://dumps.wikimedia.org/enwiki/20201101/")