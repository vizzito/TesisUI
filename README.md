TesisUI
=======

#README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

Install
-------

* Ruby version - ruby 2.1
* Rails version 4.0.2
* Tomcat 7.0.50
* Maven 3.0.4

Steps
-----

- Migrate the DB
  ==> rake db:migrate (from console) 
- Install library dependencies
  ==> bundle install
- Start Rails server
  ==> rails server // default on :3000
- Update class `ServiceClusterer/src/main/java/org/clusterer/services/ServicesAPI.java:58` DIRFILES should be the
  Tomcat's ServiceClusterer path. 
- Run `$: maven clean install` to generate .war // default in target folder
- Copy META-INF and WEB-INF folders into tomcat server (/webapps/ServiceClusterer/ folder)
- Add to Tomcat's Path/config/web.xml:
    
        <multipart-form enable="true"/>
        <servlet>
            <servlet-name>ServicesAPI</servlet-name>
            <servlet-class>org.clusterer.services.ServicesAPI</servlet-class>
        </servlet>
        <servlet-mapping>
            <servlet-name>ServicesAPI</servlet-name>
            <url-pattern>/visualtree</url-pattern>
        </servlet-mapping>
  
- Run tomcat server (port 8080)
