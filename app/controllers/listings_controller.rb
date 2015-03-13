class ListingsController < ApplicationController
  respond_to :json
  
  before_filter :restrict_access

  def index
  	@listings = Listing.all.order('created_at DESC')
  	respond_with(@listings) do |format|
      format.to_json { render :json => @listings.as_json(:include => [:realtor, :avatar]) }
    end
  end

  def show
  	@listing = Listing.find(params[:id])
  	respond_with(@listing) do |format|
      format.to_json { @listing.to_json(:include => [:realtor, :avatar]) }
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

    if @listing
      @listing.realtor = Realtor.find_by_name(params[:listing][:realtor][:name]) if params[:listing][:realtor].present?
      @listing.save!

      respond_with(@listing) do |format|
        format.to_json { @listing.to_json }
      end
    end
  end

  def update
    @listing = Listing.find(params[:id])
    if @listing.update(listing_params)
      @listing.realtor = Realtor.find_by_name(params[:realtor][:name]) if params[:realtor].present?
      @listing.save!

      respond_with(@listing) do |format|
        format.to_json { @listing.to_json }
      end
    end
  end

  def destroy
    @listing = Listing.find(params[:id])
    @listing.destroy
    respond_with(@listing)
  end

  private

  def listing_params
  	params.require(:listing).permit(:address, :city, :zipcode, :state, :price, :mls, :bedrooms, 
          :bathrooms, :garages, :sqft, :acres, :realtor, :avatar_file_name, 
          :long_description, :short_description, :build_type, :year_built)
  end

end
