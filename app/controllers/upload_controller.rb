class UploadController < ActionController::Base
  respond_to :json

  def listing_image_upload
    @listing = Listing.find(params[:id])
    @listing.avatar = params[:file]
    @listing.save!
    render :nothing => true, status: :ok
  end

  def realtor_image_upload
    @realtor = Realtor.find(params[:id])
    @realtor.avatar = params[:file]
    @realtor.save!
    render :nothing => true, status: :ok
  end
end