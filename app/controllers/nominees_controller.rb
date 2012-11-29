class NomineesController < ApplicationController
  def create
    @story = Story.find(params[:story_id])
    @nominee = @story.nominees.create(params[:nominee])
    redirect_to "/"
  end

  def index
    @num_stories = Story.count
    @num_nominees = Nominee.count
    @num_votes = Vote.count
    page = params[:page]
    if page.nil?
      page = 1
    end
    @nominees = Nominee.page(page)
  end
end
