class CreateNominees < ActiveRecord::Migration
  def change
    create_table :nominees do |t|
      t.references :story
      t.string :full_name
      t.string :mtcn

      t.timestamps
    end
    add_index :nominees, :story_id
  end
end
