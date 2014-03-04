class InvertedRadialLayoutController < ApplicationController
  def index
    
  end
  def generate
    require 'net/http'
    url = 'http://localhost:8080/ServiceClusterer/visualtree'
    #HACER ESTOOOOOOOOOOOOOOOO
    post_args = {
     'appid' => appid,
     'context' => context,
     'query' => query
    }

    resp = Net::HTTP.get_response(URI.parse(url)) # get_response takes an URI object

    @data = resp.body
    create_file("datafile","json",@data)
  end
  def create_file(path, extension,data)
    dir = File.dirname(path)

    unless File.directory?(dir)
      FileUtils.mkdir_p(dir)
    end
    # ver como setear el directorio base
    #if(Dir.pwd != "/public/tmp/files")
    #   Dir.chdir("/public/tmp/files")
    # end
    path << ".#{extension}"
    newFile = File.new(path, 'w+')
    newFile.puts(data)
    newFile.close
  end
end
