json.array! @topics do |topic|
  json.author topic.user.username
  json.user_id topic.user_id
  json.title topic.title
  json.topic_id topic.id
  json.created_at topic.created_at
  json.updated_at topic.updated_at
end
