Rails.application.routes.draw do
  devise_for :users, :skip => [:registrations]
  resources :users, :only => [:new, :create]

  resources :listings
  resources :realtors
  
  root 'home#index'

  get 'admin' => 'admin#index'
  post 'admin/listing/image/upload/:id' => 'admin#image_upload'
end
