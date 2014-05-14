require 'create_file_module.rb'
class DetectorGeneratorController < ApplicationController
  skip_before_action :verify_authenticity_token

  include CreateFileModule
  def index

  end

  def generate
   @dataPatternDetector = callDetectorService(params[:files])
#    create_data_file(@dataFile)
#    create_data_map(@dataMap)
    
 #   @serviceMap = createServiceMap(@dataMap)
   # @serviceMap = ["pepe","jose","juan"]#{"service1"=> "archivo1","service2"=> "archivo1","service3"=> "archivo2","service4"=> "archivo3"}
  #  render :json=>true
    render layout: false,:status => 200
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
