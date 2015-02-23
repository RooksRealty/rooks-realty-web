class AdminController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  respond_to :json

  def index
  end

  def image_upload
      @listing = Listing.find(params[:id])
      @listing.avatar = params[:file]
      @listing.save!
  end
end
