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
    puts "dataMap::: #{data}"
    path = Rails.root.join('public', 'tmp','files').to_s
    newFile = File.open(path+"/mapfile.json", 'w+')
    newFile.puts(data)
    newFile.close
  end
  def createServiceMap(data)
    serviceMap = {}
    files = data.split(",")
    files.each do |n|
      current = n.split(":")
      fileName = current[1][/\"(.*?)"/,1]
      serviceName = current[0][/\"(.*?)"/,1]
      
      if(serviceMap[fileName]==nil)
         arrService = []
         arrService.push(serviceName)
         serviceMap[fileName] = arrService
      else
         arrService2 = serviceMap[fileName]
         arrService2.push(serviceName)
         serviceMap[fileName] = arrService2
      end
    end
    setServiceMap(serviceMap)
    return serviceMap
  end
  def setServiceMap(serviceMap)
    @@serviceMap = serviceMap
  end
  def getServiceMap
    return @@serviceMap
  end
end