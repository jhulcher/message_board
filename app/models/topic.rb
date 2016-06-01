class Topic < ActiveRecord::Base

  validates :user_id, presence: true
  validates :title, presence: true
  validates_length_of :title, :minimum => 3, :maximum => 55, :allow_blank => false

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: "User"

  has_many :posts,
  primary_key: :id,
  foreign_key: :topic_id,
  class_name: "Post"

end
