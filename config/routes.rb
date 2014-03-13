TesisUI::Application.routes.draw do
  #get "inverted_radial_layout" => 'inverted_radial_layout#index'
  #post "inverted_radial_layout" => 'inverted_radial_layout#generate'
  post "tree_generator" => 'tree_generator#generate'
 
 
 
  
  get "parameters_layout" => 'parameters_layout'
  
  get "tree_layout" => 'pages#tree_layout'
  get "inverted_radial_layout" => 'pages#inverted_radial_layout'
  get "bundle_layout" => 'pages#bundle_edge_layout'
  get "rotate_cluster_layout" => 'pages#bundle_rotate_layout'
  get "collapse_tree_layout" => 'pages#bundle_collapse_layout'
  
  get "welcome/index"
  root "pages#inverted_radial_layout"
 
 
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
