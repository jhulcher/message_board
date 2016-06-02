json.author @post.topic.user.username
json.user_id @post.topic.user_id
json.title @post.topic.title
json.topic_id @post.topic.id
json.created_at @post.topic.created_at
json.updated_at @post.topic.updated_at

json.posts @post.topic.posts do |post|
  json.author post.user.username
  json.user_id post.user_id
  json.post_id post.id
  json.topic_id post.topic_id
  json.body post.body
  json.created_at post.created_at
  json.updated_at post.updated_at
end
