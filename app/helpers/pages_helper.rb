module PagesHelper
  def params
    @params = Parametros.first
    if @params == nil
      @params = Parametros.new
    end
    if @params != nil and (@params.bottomsimil == nil or @params.topsimil == nil)
      
      Parametros.delete_all
      @params = Parametros.new
    end
    bottom = 30
    top = 80
    @params.bottomsimil = bottom
    @params.topsimil = top
    @params.save
    
    return @params
  end
end
