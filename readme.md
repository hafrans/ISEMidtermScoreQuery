## Midterm Score Query of ISE of UJN
Demo link : [MIDTERM SQ](http://mid.scanf.cc)

---
### Abstract 
A tool to build a Midterm Score Query System of ISE quickly.
This tool was Developed by php & mysql , no other dependecies. you can build your MSQ just in 3 steps.

### Requirements
 * Operating System: Like Unix , or Windows
 * PHP : 5.4 + 
 * MYSQL/MariaDB : 5.5+(Mysql)

### Install
  copy all files into your website folder.

### Configuration
 * It is very flexable to modify index.html and I think modifing html page is too easy to tell you how to do.

 * In order to correctly connect Mysql Database, you can find database connection configuration variables in search.php (line 14 ~ 17). 
    ```php
	    $dbstring = "mysql:host=127.0.0.1;dbname=test";
	    $username = "root";
	    $passwd = "root";
	    $column_name = "score";
    ```
 * In line 69 ~ 86 ,there is the exam failure rate I have defined early. *You must check the accurate rate in new result and modify them*. 


