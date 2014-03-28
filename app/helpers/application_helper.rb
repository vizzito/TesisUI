require 'json'
module ApplicationHelper

  def full_title(page_title)
    base_title = "Graphic Bundle App"
    if page_title.empty?
      base_title
    else
      "#{base_title} | #{page_title}"
    end
  end
  
  def dataFileSet
    path = Rails.root.join('public', 'tmp','files').to_s
    newFile = File.read(path+"/map.json")
    fileSet = JSON.parse(newFile)    
  end
 
end
