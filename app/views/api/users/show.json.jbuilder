  json.user_since @user.created_at.strftime("%b %d, %Y")
  json.user_id @user.id
  json.username @user.username
  json.location @user.location
  json.about_me @user.about_me
  json.post_count @user.posts.count
