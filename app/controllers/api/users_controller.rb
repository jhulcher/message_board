class Api::UsersController < ApplicationController
  before_filter :require_signed_in!

  def index
    users = User.all
    @users = []

    users.each do |user|
      if user.recently_logged_in? || user.posts.last.created_at > 5.minutes.ago
        @users << user
      end
    end

    @users
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if params[:user][:public_id] != ""
      @user.public_id = params[:user][:public_id]
      @user.save!
    end

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
    params.require(:user).permit(:password, :username, :location, :about_me, :public_id)
  end

end
