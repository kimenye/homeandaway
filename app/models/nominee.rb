class Nominee < ActiveRecord::Base
  belongs_to :story
  has_many :votes
  attr_accessible :full_name, :mtcn

  def can_be_voted_for_by?(user)
    is_my_story = story.user == user
    has_already_voted = !votes.select { |v| v.user == user }.empty?
    !is_my_story && !has_already_voted
  end
end
