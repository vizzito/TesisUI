module ApplicationHelper
  
  def getParameters
        @params = Parametros.find(:first)
  end
end
