class StoriesController < ApplicationController

  def show
    @num_stories = Story.count
    @num_nominees = Nominee.count
    @num_votes = Vote.count
    @story = Story.find(params[:id])
    #@other_stories = Story.find()
  end

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
