class ContactController < ApplicationController
  respond_to :json
  
  before_filter :restrict_access

  def contact
  	Emailer.submit_contact_message(contact_params).deliver
	  render :nothing => true, status: :ok
  end

  def scheduleShowing
    @details = showing_params
    listing = Listing.find_by_mls(@details[:mls])
    @details[:realtor] = listing.realtor if listing.present?
    Emailer.schedule_showing(@details).deliver
    render :nothing => true, status: :ok
  end

  def propertyQuestion
    @details = question_params
    listing = Listing.find_by_mls(@details[:mls])
    @details[:realtor] = listing.realtor if listing.present?
    Emailer.property_question(@details).deliver
    render :nothing => true, status: :ok
  end

  private

  def contact_params
  	params.require(:contact).permit(:name, :email, :message)
  end

  def showing_params
    params.require(:showing).permit(:name, :email, :phone_number, :mls, :additional)
  end

  def question_params
    params.require(:question).permit(:email, :phone_number, :question, :mls)
  end
end