require 'create_file_module.rb'

class TreeGeneratorController < ApplicationController
  include CreateFileModule
  def index

  end

  def generate

    @params = Parametros.first
    bottom = params[:bottomsimil]
    top = params[:topsimil]
    updateParams(bottom,top)
    callService(bottom,top)
    extension = "json"
    create_file(extension,@data)
    respond_to do |format|
      format.json { head :ok }
    end
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
