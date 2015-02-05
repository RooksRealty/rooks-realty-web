class UsersController < AdminController

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      flash[:success] = "User saved"
      redirect_to @user
    else
      render 'new'
    end
  end
end