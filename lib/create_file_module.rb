module CreateFileModule
  def callService(bottomsimil,topsimil,selectedFiles)
    #require 'uri'
    require 'net/http'
    
    #  require 'net/https'
    uri = URI.parse('http://localhost:8080/ServiceClusterer/visualtree')

    #post_args = {
 #     'bottomsimil' => bottomsimil,
  #    'topsimil' => topsimil
  #  }

    data = {"username"=>"USER",                  
                  "password"=>"PWD",
                  "selectedFiles"=>selectedFiles}     
    
    headers = {"Content-Type" => "application/json",          
                         'Accept-Encoding'=> "gzip,deflate",
                         'Accept' => "application/json"}

    http = Net::HTTP.new(uri.host,uri.port)   
   # http.use_ssl = true                       
   # http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    response = http.post(uri.path,data.to_json,headers)
    puts response.code
    puts response.body
    
    @data = response.body
  end

  def create_file(extension,data)
    path = Rails.root.join('public', 'tmp','files').to_s
    newFile = File.open(path+"/datafile.json", 'w+')
    newFile.puts(data)
    newFile.close
  end
end