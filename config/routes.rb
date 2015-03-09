Rails.application.routes.draw do
  devise_for :users, :skip => [:registrations]
  resources :users, :only => [:new, :create, :index]

  resources :listings
  resources :realtors
  
  root 'home#index'

  post 'contact' => 'contact#contact'
  post 'schedule_showing' => 'contact#scheduleShowing'
  post 'incoming_mails' => 'incoming_mails#create'

  get 'admin' => 'admin#index'
  post '/listing/image/upload/:id' => 'upload#listing_image_upload'
  post '/realtor/image/upload/:id' => 'upload#realtor_image_upload'
end
