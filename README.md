TesisUI
=======


== README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

Install
* Ruby version - ruby 2.1
* Rails version 4.0.2
* Tomcat 7.0.50
* Maven 3.0.4

Steps
- install library dependencies
  ==>bundle install
- migrate the DB
  ==>rake db:migrate (from console) 
- Start Rails server
  ==>rails server // default on :3000
- maven clean install to generate .war // default in target folder
- copy META-INF and WEB-INF folders into tomcat server (/webapps/ServiceClusterer/ folder)
- run tomcat server (port 8080)

Tomcat Configuration

- inside webapps create a folder named ServiceClusterer and copy the WEB-INF and META-INF inside.
Example: /home/panther/tomcat/apache-tomcat-7.0.52/webapps/ServiceClusterer/META-INF
         /home/panther/tomcat/apache-tomcat-7.0.52/webapps/ServiceClusterer/WEB-INF
- give pemissions: sudo chown -R  panther:panther /home/panther/tomcat/apache-tomcat-7.0.52/work/Catalina/localhost/ServiceClusterer/         
- update this property with the local tomcat folder in config.properties file 
tomcat.dir = "/home/panther/tomcat/apache-tomcat-7.0.52/webapps/ServiceClusterer"

- Enable multipart configuration in tomcat
==> put this: <multipart-form enable="true"/> in web.xml file