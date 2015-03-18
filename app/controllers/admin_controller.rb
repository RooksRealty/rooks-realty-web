class AdminController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  respond_to :json

  def index
  end

  def website_info
  	authenticate_or_request_with_http_token do |token, options|
      if ApiKey.exists?(access_token: token)
      	@info = Info.first
	  	respond_with(@info) do |format|
	      format.to_json { render :json => @info.as_json }
	    end

      	break
      end
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
    params.require(:admin).permit(:addres, :city, :state, :zip_code, :about_us, :phone_number, :fax, :email)
  end

end
