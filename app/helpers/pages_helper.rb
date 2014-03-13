module PagesHelper
  def params
   @params = Parametros.find(:first)  
  end
end
