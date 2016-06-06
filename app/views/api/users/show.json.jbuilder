  json.user_since @user.created_at.strftime("%b %d, %Y")
  json.user_id @user.id
  json.username @user.username
  json.public_id @user.public_id
  json.location @user.location
  json.about_me @user.about_me
  json.post_count @user.posts.count
  json.total_post_count Post.all.count
  json.thread_count @user.topics.count
  json.total_thread_count Topic.all.count
