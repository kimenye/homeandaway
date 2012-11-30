class AdminController < ApplicationController
  protect_from_forgery
  before_filter :require_http_basic_auth

  def require_http_basic_auth
    authenticate_or_request_with_http_basic do |login, password|
      return login == "admin" && password == "password"
    end
  end

  def index
    page = params[:page]
    if page.nil?
      page = 1
    end
    @stories = Story.joins(:nominees).where(:has_won => nil).paginate(:page => page, :per_page => 10)
    render :layout => 'admin'
  end

  def winner

    story = Story.find(params[:id])
    story.has_won=true
    story.date_won=Date.current()
    story.save!

    flash[:notice] = "#{story.title} is the winning Story for the day"
    @winning_stories = Story.where(:has_won => true).order('date_won DESC')
  end
end
