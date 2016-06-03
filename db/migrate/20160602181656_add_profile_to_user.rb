class AddProfileToUser < ActiveRecord::Migration
  def up
    add_column :users, :location, :string, null: true
    add_column :users, :about_me, :string, null: true
  end
end
