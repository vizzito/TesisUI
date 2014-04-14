class PagesController < ApplicationController
  def inverted_radial_layout
    @title = "Inverted Radial"
    render :layout => false
  end

  def bundle_rotate_layout
    @title = "Rotate Layout"
    render layout: false
  end

  def bundle_collapse_layout
    @title = "Collapse Layout"
    render layout: false
  end

  def bundle_edge_layout
    @title = "Edge Bundle"
    render layout: false
  end

  def tree_layout
    @title = "Tree"
    render layout: false
  end
  
  def popover
    hola = "hola"
    @serviceMap = ["pepe","hola","juan"]
   render layout: false
    
      end
end
