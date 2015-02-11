class ListingsController < ApplicationController
  respond_to :json
  
  before_filter :restrict_access

  def index
  	@listings = Listing.all
  	respond_with(@listings) do |format|
      format.to_json { render :json => @listings.as_json(:include => :realtor) }
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

end