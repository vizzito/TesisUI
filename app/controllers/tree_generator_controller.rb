require 'create_file_module.rb'

class TreeGeneratorController < ApplicationController
  include CreateFileModule
  def index
    
  end
  def generate
    
    @params = Parametros.find(:first)
    bottom = params[:bottomsimil]
    top = params[:topsimil]
    updateParams(bottom,top)
    callService(bottom,top)
    extension = "json"
    create_file(extension,@data)
    #render :nothing => true, :status => 200, :content_type => 'text/html'
 #   render "inverted_radial_layout/index"
  #  render "inverted_radial_layout/index.html.erb"
    #render :controller => "inverted_radial_layout", :action => "index"
   # redirect_to inverted_radial_layout_path
   respond_to do |format|
    #format.json { head :ok }
    format.html {render :text => 'showRadial'}
  end
  #render :text => "hello world!"
    #render :js => "alert('This Therapist is assigned to a visit')"
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
