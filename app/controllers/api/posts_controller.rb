class Api::PostsController < ApplicationController
  before_filter :require_signed_in!

  def show
    @post = Post.find(params[:id])
  end

  def index
    search_terms = params[:post][:body].split(" ")
    @posts = []

    usernames = []
    User.all.each do |user|
      usernames.push(user.username)
    end

    if usernames.include?(params[:post][:body])
      if User.find_by({ username: params[:post][:body] })
        @user = User.find_by({ username: params[:post][:body] })
        @posts = @user.posts
      end
    else
      Post.all.each do |post|
        search_terms.each do |word|
          if post.body.split(" ").include?(word) && !(@posts.include?(post))
            @posts.push(post)
          end
        end
      end

    end
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    @post.save!
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy!
  end

  private
  def post_params
    params.require(:post).permit(:topic_id, :body)
  end
end
