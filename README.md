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

- Migrate the DB
  : `$: rake db:migrate` (from console) 
- Install library dependencies
  : `$: bundle install`
- Start Rails server
  : `$: rails server` // default on :3000

- Run `$: maven clean install` to generate .war // default in target folder
- Run `$: maven eclipse:clean eclipse:eclipse` 
- Copy META-INF and WEB-INF folders into tomcat server (/webapps/ServiceClusterer/ folder)[create the folder named "ServiceClusterer"]
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
        
- update this property with the local tomcat folder in config.properties file 
  `$: tomcat.dir = "/home/panther/tomcat/apache-tomcat-7.0.52/webapps/ServiceClusterer"` 
- give pemissions: 
   `$: sudo chown -R  panther:panther /home/panther/tomcat/apache-tomcat-7.0.52/work/Catalina/localhost/ServiceClusterer/`
- Run tomcat server (port 8080)
