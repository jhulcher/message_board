class Api::UsersController < ApplicationController
  before_filter :require_signed_in!

  def index
    @users = current_users
    # render "json"
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if params[:user][:location] != ""
      @user.location = params[:user][:location]
      @user.save!
    end

    if params[:user][:about_me] != ""
      @user.about_me = params[:user][:about_me]
      @user.save!
    end

    @user
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :location, :about_me)
  end

end
