class Story < ActiveRecord::Base
  belongs_to :user
  has_many :nominees, :dependent => :destroy
  attr_accessible :body, :status, :title, :picture

  validates_presence_of :title, :body

  has_attached_file :picture, :styles => { :medium => "300x300>", :thumb => "65x65>" }

  self.per_page = 6

  def has_nominee?
    return !nominee.nil?
  end

  def nominee
    nominees.first
  end

  def has_pic?
    return !picture_file_name.nil?
  end

  def has_voted? user
    return has_nominee? && nominee.has_already_voted?(user)
  end

  def can_vote_for_story? user
    res = has_nominee? && nominee.can_be_voted_for_by?(user)
  end

  def story_text
    body.split(//).first(170).join + "..."
  end

  def votes
    num = 0
    if has_nominee?
      num = nominee.votes.length
    end
    num
  end
end
