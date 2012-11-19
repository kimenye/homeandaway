class UsersController < ApplicationController
  respond_to :json

  def new
    @user = User.new
    @user.login_type = "http"
  end

  def create
    if params[:user][:avatar] == ""
      params[:user][:avatar] = nil
    end
    @user = User.new(params[:user])
    result = @user.save
    if (result)
      #mark the user as logged in
      session[:user_id] = @user.id
      logged_in = current_user
    end
    respond_with @user
  end
end
