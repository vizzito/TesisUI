module CreateFileModule 
require 'json'
  def callService(data)  
    require 'rest-client'  
    # response = RestClient.post 'https://serviceclusterer.herokuapp.com/ServiceClusterer/visualtree',{:files => data,:multipart => true}
    response = RestClient.post 'http://localhost:8080/ServiceClusterer/visualtree',{:files => data,:multipart => true}
    responseData = response.body.split("\n")
    @dataFile = responseData[0]
    @dataMap = responseData[1]
    @numberCluster = responseData[2]
    @validationInfo = responseData[3]
    @@fileSize = responseData[4]
    @dataValidation = ActiveSupport::JSON.decode(@validationInfo)
    setDataValidation(@dataValidation)
     end
  def getDataValidation
    return @@dataValidation
  end
  def setDataValidation(dataValidation)
    @@dataValidation = dataValidation
  end

   def callDetectorService(data)  
     require 'rest-client'    
     
     resource = RestClient::Resource.new "http://localhost:8090/detector/ap-detector", 
                                    :timeout => -1, 
                                    :open_timeout => -1
                                    
     # resource = RestClient::Resource.new "https://detector.herokuapp.com/detector/ap-detector", 
                                    # :timeout => -1, 
                                    # :open_timeout => -1

     response = resource.post  :params => {:files => data,:multipart => true}
     
     #response = RestClient.post 'http://localhost:8090/detector/ap-detector',{:files => data,:multipart => true, :timeout => 90000000}
   #  response = RestClient.post 'https://detector.herokuapp.com/detector/ap-detector',{:files => data,:multipart => true}
     jsonObject = JSON.parse(response)
     @dataDetector = response
     dataValidation = getDataValidation
     @@error = dataValidation["squaredError"]
     @@intra = dataValidation["intraDistance"]
     @@inter = dataValidation["interDistance"]
     return jsonObject;
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
  
  def create_data_detector(data)
    path = Rails.root.join('public', 'tmp','files').to_s
    newFile = File.open(path+"/dataDetector.json", 'w+')
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