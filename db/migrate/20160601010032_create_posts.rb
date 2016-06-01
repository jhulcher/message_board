class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id, null: false
      t.integer :topic_id, null: false
      t.text :body, null: false, :limit => 1000
      t.timestamps null: false
    end
    add_index :posts, :topic_id
    add_index :posts, :user_id
  end
end
