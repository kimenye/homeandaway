class VotesController < ApplicationController

  respond_to :json

  def create
    nominee = Nominee.find(params[:nominee_id])
    @vote = nominee.votes.create(:user => current_user);
    respond_with @vote
  end
end
