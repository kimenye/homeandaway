class HomeController < ApplicationController
  def index
    @stories = Story.page(1).order('created_at DESC')
    @num_stories = Story.count
    @num_nominees = Nominee.count
    @num_votes = Vote.count
  end

  respond_to :json

  def logged_in
    respond_with current_user
  end
end
