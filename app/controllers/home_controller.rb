class HomeController < ApplicationController
  def index
    @stories = Story.last(5).reverse
  end
end
