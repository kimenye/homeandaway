class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.references :user
      t.string :title
      t.text :body
      t.string :status

      t.timestamps
    end
    add_index :stories, :user_id
  end
end
