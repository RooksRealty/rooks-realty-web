Rails.application.routes.draw do
  devise_for :users, :skip => [:registrations]
  resources :users, :only => [:new, :create]

  resources :listings
  resources :realtors
  
  root 'home#index'

  post 'contact' => 'contact#contact'

  get 'admin' => 'admin#index'
  post 'admin/listing/image/upload/:id' => 'admin#listing_image_upload'
  post 'admin/realtor/image/upload/:id' => 'admin#realtor_image_upload'
end
