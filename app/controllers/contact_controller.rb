class ContactController < ApplicationController
  respond_to :json
  
  before_filter :restrict_access

  def contact
  	Emailer.submit_contact_message(contact_params).deliver
	  render :nothing => true, status: :ok
  end

  private

  def contact_params
  	params.require(:contact).permit(:name, :email, :message)
  end
end