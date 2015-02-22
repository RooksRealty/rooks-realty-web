Rails.application.routes.draw do
  devise_for :users, :skip => [:registrations]
  resources :users, :only => [:new, :create]

  resources :listings
  resources :realtors
  
  root 'home#index'

  get 'admin' => 'admin#index'
end
