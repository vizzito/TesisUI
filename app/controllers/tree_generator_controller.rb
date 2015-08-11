require 'create_file_module.rb'

class TreeGeneratorController < ApplicationController
  include CreateFileModule
  def index

  end

  def generate
    puts "AAAAAAAAAAAA:::#{params}"
    bottom = params[:bottomsimil]
    top = params[:topsimil]
    updateParams(bottom,top)
    callService(params)
    
    create_data_file(@dataFile)
    create_data_map(@dataMap)
    create_data_detector(@dataDetector)
    @serviceMap = createServiceMap(@dataMap)
    render :json => {:success => true, :numberCluster => @numberCluster}
  end

  def updateParams(bottom,top)
    if @params == nil
      @params = Parametros.new
    @params.bottomsimil = bottom
    @params.topsimil = top
    @params.save
    else
      @params.update(bottomsimil: bottom,topsimil:top)
    end
  end
end
