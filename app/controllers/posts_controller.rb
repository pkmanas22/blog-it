# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    @posts = Post.includes(:categories).order(updated_at: :desc)
    if params[:category].present?
      categories = Array(params[:category])
      downcased_categories = categories.map(&:downcase)

      @posts = @posts.joins(:categories).where("LOWER(categories.name) IN (?)", downcased_categories).distinct
    end

    render
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfullyCreated", model: Post.model_name.human))
  end

  before_action :load_post!, only: %i[show]

  def show
    render
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :user_id, category_ids: [])
    end

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end
end
