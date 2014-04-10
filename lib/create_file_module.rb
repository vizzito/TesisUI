module CreateFileModule
  def callService(data)  
    require 'rest-client'    
    uri = URI.parse('http://localhost:8080/ServiceClusterer/visualtree')
    response = RestClient.post 'http://localhost:8080/ServiceClusterer/visualtree',{:files => data,:multipart => true}
    @data = response.body
  end

  def create_file(extension,data)
    path = Rails.root.join('public', 'tmp','files').to_s
    newFile = File.open(path+"/datafile.json", 'w+')
    newFile.puts(data)
    newFile.close
  end
end