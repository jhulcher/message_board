class Api::PostsController < ApplicationController
  before_filter :require_signed_in!

  def show
    @post = Post.find(params[:id])
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
