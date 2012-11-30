class StoriesController < ApplicationController

  def index
    @num_stories = Story.count
    @num_nominees = Nominee.count
    @winning_stories = Story.joins(:nominees).where(:has_won => true).count
    @stories = Story.page(params[:page]).order('created_at DESC')
  end

  def show
    @num_stories = Story.count
    @num_nominees = Nominee.count
    @winning_stories = Story.joins(:nominees).where(:has_won => true).count
    @story = Story.find(params[:id])
    prev = Story.where("id > ?", params[:id]).first
    nxt = Story.where("id < ?", params[:id]).first
    @other_stories = []
    @other_stories.push(prev) if !prev.nil?
    @other_stories.push(nxt) if !nxt.nil?
  end

  def winners
    @num_stories = Story.count
    @num_nominees = Nominee.count
    @winning_stories = Story.joins(:nominees).where(:has_won => true).count

    @stories = Story.where(:has_won => true).order('date_won DESC')
  end

  respond_to :json

  def create
    if params[:story][:picture] == ""
      params[:story][:picture] = nil
    end
    @user = User.find(params[:user_id])
    @story = @user.stories.create(params[:story])

    puts "#{params}"
    if params[:nominee] and params[:nominee][:full_name] != "" and params[:nominee][:mtcn] != ""
    #  nominate a user
      @nominee = @story.nominees.create(params[:nominee])
    end
    respond_with @story
  end
end
