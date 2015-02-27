Rails.application.routes.draw do
  devise_for :users, :skip => [:registrations]
  resources :users, :only => [:new, :create]

  resources :listings
  resources :realtors
  
  root 'home#index'

  post 'contact' => 'contact#contact'

  get 'admin' => 'admin#index'
  post '/listing/image/upload/:id' => 'upload#listing_image_upload'
  post '/realtor/image/upload/:id' => 'upload#realtor_image_upload'
end
