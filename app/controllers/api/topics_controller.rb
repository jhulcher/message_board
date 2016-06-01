class Api::TopicsController < ApplicationController
  before_filter :require_signed_in!

  def index
    @topics = Topic.all
  end

  def show
    @topic = Topic.find(params[:id])
  end

  def create
    @topic = Topic.new(topic_params)
    @topic.user_id = current_user.id
    @topic.save!

  end

  def destroy
    @topic = Topic.find(params[:id])
    @topic.destroy!
    # render json: {}
  end

  private
  def topic_params
    params.require(:topic).permit(:title)
  end
end
