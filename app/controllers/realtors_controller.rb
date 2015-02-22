class RealtorsController < ApplicationController
  respond_to :json
  
  before_filter :restrict_access

  def index
  	@realtors = Realtor.all
  	respond_with(@realtors) do |format|
      format.to_json { render :json => @realtors.as_json }
    end
  end
end