class PagesController < ApplicationController
  def inverted_radial_layout
    @title = "Inverted Radial"

  end

  def bundle_rotate_layout
    @title = "Rotate Layout"
  end

  def bundle_collapse_layout
    @title = "Collapse Layout"
  end

  def bundle_edge_layout
    @title = "Edge Bundle"
  end

  def tree_layout
    @title = "Tree"
  end
  
end
