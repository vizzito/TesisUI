require 'create_file_module.rb'

class TreeGeneratorController < ApplicationController
  include CreateFileModule
  def index

  end

  def generate
 #   debugger
   # data = params[:files]
    
    bottom = params[:bottomsimil]
    top = params[:topsimil]
 #   selectedFiles = params[:files]
    
    updateParams(bottom,top)
    
  #  callService(bottom,top,selectedFiles)
    callService(params)
    extension = "json"
    create_file(extension,@data)
    render :json=>true
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
