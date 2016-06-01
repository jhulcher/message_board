json.author @topic.user.username
json.user_id @topic.user_id
json.title @topic.title
json.topic_id @topic.id
json.created_at @topic.created_at
json.updated_at @topic.updated_at

json.posts @topic.posts do |post|
  json.author post.user.username
  json.user_id post.user_id
  json.topic_id post.topic_id
  json.post_id post.id
  json.body post.body
  json.created_at post.created_at
  json.updated_at post.updated_at
end
