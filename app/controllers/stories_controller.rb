class StoriesController < ApplicationController

  respond_to :json

  def create
    if params[:story][:picture] == ""
      params[:story][:picture] = nil
    end
    @user = User.find(params[:user_id])
    @story = @user.stories.create(params[:story])

    if params[:nominee]
    #  nominate a user
      @nominee = @story.nominees.create(params[:nominee])
    end
    respond_with @story
  end
end
