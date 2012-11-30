class AddHasWonToStory < ActiveRecord::Migration
  def change
    add_column :stories, :has_won, :boolean, :default=> 0
  end
end
