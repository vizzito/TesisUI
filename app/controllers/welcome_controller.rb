class WelcomeController < ApplicationController
  def index
    @title = "Home"
    @numberCluster = 1
    @fileSize = 1
    initializeMapFile()
  end

  def initializeMapFile
    path = Rails.root.join('public', 'tmp','files').to_s
    newFile = File.open(path+"/datafile.json", 'w+')
    @emptyMap = "[{\"name\":\"\",\"nameKey\":\"\",\"imports\":[]}]"
    newFile.puts(@emptyMap)
    newFile.close
  end
end
