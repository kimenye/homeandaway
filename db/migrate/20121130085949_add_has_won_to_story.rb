class AddHasWonToStory < ActiveRecord::Migration
  def change
    add_column :stories, :has_won, :boolean
  end
end
