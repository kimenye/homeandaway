class NomineesController < ApplicationController
  def create
    @story = Story.find(params[:story_id])
    @nominee = @story.nominees.create(params[:nominee])
    redirect_to "/"
  end
end
