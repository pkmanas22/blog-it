# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.all

    render status: :ok, json: { posts: }
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfullyCreated"))
  end

  def show
    @post = Post.find_by(slug: params[:slug])

    if @post
      render status: :ok, json: { post: @post }
    else
      render status: :not_found, json: { error: "Post not found" }
    end
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
