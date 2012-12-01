class Nominee < ActiveRecord::Base
  belongs_to :story
  has_many :votes
  attr_accessible :full_name, :mtcn

  validates_presence_of :full_name
  validates_presence_of :mtcn

  self.per_page = 10

  def can_be_voted_for_by?(user)
    is_my_story = story.user == user
    !is_my_story and !has_already_voted? (user)
  end

  def has_already_voted?(user)
    return !votes.select { |v| v.user == user }.empty?
  end
end
