class InfoController < ApplicationController
  respond_to :json
  before_filter :restrict_access

  def website_info
  	@info = Info.first
  	respond_with(@info) do |format|
      format.to_json { render :json => @info.as_json }
    end
  end

  def update_info
    @info = Info.find(params[:id])
    if @info.update(info_params)
      render :nothing => true, status: :ok
    end
  end

  private

  def info_params
    params.require(:info).permit(:address, :city, :state, :zip_code, :about_us, :phone_number, :fax, :email)
  end

end
