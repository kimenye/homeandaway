class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_hash
      t.string :password_salt
      t.string :login_type
      t.string :first_name
      t.string :last_name

      t.timestamps
    end
  end
end
