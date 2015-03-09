class UsersController < AdminController
  respond_to :json
  before_filter :restrict_access

  def new
    @user = User.new
  end

  def index
    @users = User.all
    respond_with(@users) do |format|
      format.to_json { render :json => @users.as_json }
    end
  end

  def create
    @user = User.new(user_params)
    @user.password = 'password'
    if @user.save
      render :nothing => true, status: :ok
    else
      render :nothing => true, status: :error
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    respond_with(@user)
  end

  private

  def restrict_access
    authenticate_or_request_with_http_token do |token, options|
      ApiKey.exists?(access_token: token)
    end
  end

  def user_params
    params.require(:user).permit(:email)
  end
end