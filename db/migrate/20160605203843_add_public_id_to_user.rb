class AddPublicIdToUser < ActiveRecord::Migration
  def change
    add_column :users, :public_id, :string, default: "pgp6sz29mwql1zooptrp", null: false
  end
end
