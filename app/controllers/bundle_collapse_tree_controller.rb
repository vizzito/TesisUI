class BundleCollapseTreeController < ApplicationController
  def index
    @params = Parametros.find(:first)
  end
end
