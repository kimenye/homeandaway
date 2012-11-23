class HomeController < ApplicationController
  def index
    @stories = Story.last(6).reverse
    @num_stories = Story.count
    @num_nominees = Nominee.count
    @num_votes = Vote.count
  end

  respond_to :json

  def logged_in
    respond_with current_user
  end
end
