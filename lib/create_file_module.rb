
module CreateFileModule
  
  def callService(bottomsimil,topsimil)
    require 'net/http'
      url = URI.parse('http://localhost:8080/ServiceClusterer/visualtree')
    post_args = {
      'bottomsimil' => bottomsimil,
      'topsimil' => topsimil
    }

    resp = Net::HTTP.post_form(url, post_args) # get_response takes an URI object
    @data = resp.body
  end
  def create_file(extension,data)
    path = Rails.root.join('public', 'tmp','files').to_s
    newFile = File.open(path+"/datafile.json", 'w+')
    newFile.puts(data)
    newFile.close
  end
end