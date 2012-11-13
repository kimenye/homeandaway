class StoriesController < ApplicationController

  def create
    @user = User.find(params[:user_id])
    @story = @user.stories.create(params[:story])
    redirect_to "/"
  end
end
