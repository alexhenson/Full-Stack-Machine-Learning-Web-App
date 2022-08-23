# Title 
>Full-Stack-Machine-Learning-Web-App

## Purpose
>A GUI-based application that utilizes MySQL dbConnection and file server applications, lambda expressions, localization/ date/time APIs, and advanced exception control mechanisms with data-access-object (DAO) design

## Author & Contact Information
>Alex Henson | <https://www.linkedin.com/in/hensonalex/>

## Student Application Version & Date
>Application Version: 1.0  
>Application Date: December 6, 2021
> 
### IDE Info
>IntelliJ IDEA 2021.1.1 (Community Edition)  
>Build #IC-211.7142.45.45, built on April 30, 2021
> 
> Runtime version: 11.0.10+9-b1341.41 amd64  
> VM: Dynamic Code Evolution 64-Bit Server VM by JetBrains s.r.o.
> 
> Powered by: open-source software

### JDK Info
>Java Version: 11.0.11  
>Java Version Date: April 20, 2021

### JavaFX Info
>JavaFX-SDK-11.0.2

### How to run the program
>Create a `database.xml` file in the root of the directory of the repo with the following contents (being sure to fill in the nodes):

```xml
<?xml version = "1.0"?>
<database>
    <server></server>
    <port></port>
    <name></name>
    <user></user>
    <password></password>
</database>
```

>You will also need a user in the database with the username "test" and the password "test".

### Description of additional report
> The additional report shows the count of appointments categorized by the seven days of the week. It utilizes an enumerated set of 'DayOfWeek' objects to print out the individual day names.

### MySQL Connector Driver Info
>mysql-connector-java-8.0.25
