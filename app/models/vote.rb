class Vote < ActiveRecord::Base
  belongs_to :nominee
  belongs_to :user

  attr_accessible :user
end
