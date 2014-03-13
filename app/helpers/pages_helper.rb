module PagesHelper
  def params
    @params = Parametros.first
    if @params == nil
      @params = Parametros.new
    bottom = 30
    top = 80
    @params.bottomsimil = bottom
    @params.topsimil = top
    @params.save
    end
    return @params
  end
end
