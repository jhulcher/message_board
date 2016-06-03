json.array! @posts do |post|
  json.username post.user.username
  json.user_id post.user.id
  json.post_id post.id
  json.created_at post.created_at
  json.topic_title post.topic.title
  json.topic_id post.topic_id
  json.body post.body
end
