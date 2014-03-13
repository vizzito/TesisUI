module ApplicationHelper
  
  def getParameters
        @params = Parametros.find(:first)
  end
  
  def full_title(page_title)
    base_title = "Graphic Bundle App"
    if page_title.empty?
      base_title
    else
      "#{base_title} | #{page_title}"
    end
  end
end
