module CreateFileModule
  def callService(data)  
    require 'rest-client'    
    uri = URI.parse('http://localhost:8080/ServiceClusterer/visualtree')
    response = RestClient.post 'http://localhost:8080/ServiceClusterer/visualtree',{:files => data,:multipart => true}
    responseData = response.body.split("\n")
    @dataFile = responseData[0]
    @dataMap = responseData[1]
  end

  def create_data_file(data)
    path = Rails.root.join('public', 'tmp','files').to_s
    newFile = File.open(path+"/datafile.json", 'w+')
    newFile.puts(data)
    newFile.close
  end
  
  def create_data_map(data)
    path = Rails.root.join('public', 'tmp','files').to_s
    newFile = File.open(path+"/mapfile.json", 'w+')
    newFile.puts(data)
    newFile.close
  end
end