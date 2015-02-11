class ListingsController < ApplicationController
  before_filter :restrict_access
  respond_to :json

  def index
  	@listings = Listing.all
  	respond_with(@listings) do |format|
      format.to_json { render :json => @listings.to_json(:include => :realtor) }
    end
  end

  def show
  	@listing = Listing.find(params[:id])
  	respond_with(@listing) do |format|
      format.to_json { @listing.to_json(:include => :realtor) }
    end
  end

  def new
    @listing = Listing.new
    respond_with(@listing) do |format|
      format.to_json { @listing.to_json }
    end
  end

  def create
    @listing = Listing.new(listing_params)
    @listing.save
    respond_with(@listing) do |format|
      format.to_json { @listing.to_json }
    end
  end

  def update
    @listing.update(listing_params)
    respond_with(@listing)
  end

  def destroy
    @listing.destroy
    respond_with(@listing)
  end

  private

  def listing_params
  	params.require(:listing).permit(:address, :city, :zipcode, :price, :mls, :bedrooms, :bathrooms, :garages, :sqft)
  end

  def restrict_access
    authenticate_or_request_with_http_token do |token, options|
      ApiKey.exists?(access_token: token)
    end
  end

end