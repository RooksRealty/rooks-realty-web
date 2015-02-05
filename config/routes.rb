Rails.application.routes.draw do
  devise_for :users, :skip => [:registrations]
  resources :users, :only => [:new, :create]
  
  root 'home#index'
end
