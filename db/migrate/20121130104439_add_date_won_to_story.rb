class AddDateWonToStory < ActiveRecord::Migration
  def change
    add_column :stories, :date_won, :datetime
  end
end
