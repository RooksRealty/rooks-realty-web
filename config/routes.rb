Rails.application.routes.draw do
  devise_for :realtors, :skip => [:registrations]
  resources :realtors, :only => [:new, :create]

  resources :listings
  
  root 'home#index'
end
