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
- migrate the DB
  ==>rake db:migrate (from console) 
- install library dependencies
  ==>bundle install
- Start Rails server
  ==>rails server // default on :3000
- maven clean install to generate .war // default in target folder
- copy META-INF and WEB-INF folders into tomcat server (/webapps/ServiceClusterer/ folder)
- run tomcat server (port 8080)

