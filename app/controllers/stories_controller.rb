class StoriesController < ApplicationController

  def index
    @stories = Story.page(params[:page]).order('created_at DESC')
  end

  def show
    @num_stories = Story.count
    @num_nominees = Nominee.count
    @num_votes = Vote.count
    @story = Story.find(params[:id])
    prev = Story.where("id > ?", params[:id]).first
    nxt = Story.where("id < ?", params[:id]).first
    @other_stories = []
    @other_stories.push(prev) if !prev.nil?
    @other_stories.push(nxt) if !nxt.nil?
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
