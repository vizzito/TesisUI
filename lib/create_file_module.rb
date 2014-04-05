module CreateFileModule
  def callService(data)
    #require 'uri'
    #require 'net/http'
    #  require 'net/https'
    
    require 'rest-client'    
    uri = URI.parse('http://localhost:8080/ServiceClusterer/visualtree')
    response = RestClient.post 'http://localhost:8080/ServiceClusterer/visualtree',{:files => data,:multipart => true}


    #data = {"username"=>"USER",                  
    #              "password"=>"PWD",
    #              "selectedFiles"=>selectedFiles}     
    
    # headers = {"Content-Type" => "application/json",          
                         # 'Accept-Encoding'=> "gzip,deflate",
                         # 'Accept' => "application/json"}
# 
    # http = Net::HTTP::Multipart.new(uri.host,uri.port)   
    # response = http.post(uri.path,data.to_json,headers)
    # puts response.code
    # puts response.body
    
    
    
    
    
    @data = response.body
  end

  def create_file(extension,data)
    path = Rails.root.join('public', 'tmp','files').to_s
    newFile = File.open(path+"/datafile.json", 'w+')
    newFile.puts(data)
    newFile.close
  end
end