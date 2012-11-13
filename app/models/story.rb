class Story < ActiveRecord::Base
  belongs_to :user
  attr_accessible :body, :status, :title, :picture

  validates_presence_of :title, :body

  has_attached_file :picture, :styles => { :medium => "300x300>", :thumb => "100x100>" }
end
