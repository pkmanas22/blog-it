# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    @posts = Post.order({ updated_at: :desc })
    render
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfullyCreated"))
  end

  before_action :load_post!, only: %i[show]

  def show
    render_json({ post: @post })
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end
end
