class Post < ActiveRecord::Base
  validates :user_id, presence: true
  validates :topic_id, presence: true
  validates :body, presence: true
  validates_length_of :body, :minimum => 3, :maximum => 1000, :allow_blank => false

  belongs_to :topic,
  primary_key: :id,
  foreign_key: :topic_id,
  class_name: "Topic"

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: "User"
end
