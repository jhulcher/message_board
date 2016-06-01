  json.user_since @user.created_at.strftime("%b %d, %Y")
  json.user_id @user.id
  json.username @user.username
