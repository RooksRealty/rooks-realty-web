class RealtorsController < ApplicationController
  respond_to :json
  
  before_filter :restrict_access

  def index
  	@realtors = Realtor.all
  	respond_with(@realtors) do |format|
      format.to_json { render :json => @realtors.as_json }
    end
  end

  def show
    @realtor = Realtor.find(params[:id])
    respond_with(@realtor) do |format|
      format.to_json { @realtor.to_json(:include => :listings) }
    end
  end

  def create
    @realtor = Realtor.new(realtor_params)
    @realtor.save

    if @realtor
      respond_with(@realtor) do |format|
        format.to_json { @realtor.to_json }
      end
    end
  end

  def update
    @realtor = Realtor.find(params[:id])
    if @realtor.update(realtor_params)
      render :nothing => true, status: :ok
    end
  end

  def destroy
    @realtor = Realtor.find(params[:id])
    @realtor.destroy
    respond_with(@realtor)
  end

  private

  def realtor_params
  	params.require(:realtor).permit(:name, :email, :phone_number, :avatar)
  end
end