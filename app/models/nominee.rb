class Nominee < ActiveRecord::Base
  belongs_to :story
  attr_accessible :full_name, :mtcn
end
