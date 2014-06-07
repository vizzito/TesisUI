require 'create_file_module.rb'
class DetectorGeneratorController < ApplicationController
  skip_before_action :verify_authenticity_token

  include CreateFileModule
  def index

  end

  def generate
   response = callDetectorService(params[:files])
   @dataPatternDetector = response["antiPatterns"]
   @fileName = response["fileName"]
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
