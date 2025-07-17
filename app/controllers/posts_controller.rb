# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    @posts = Post.includes(:categories).order(updated_at: :desc)

    if params[:category].present?
      categories = Array(params[:category])
      downcased_categories = categories.map(&:downcase)

      @posts = @posts
        .joins(:categories)
        .where("LOWER(categories.name) IN (?)", downcased_categories)
        .distinct
    end

    @total_posts_count = @posts.count

    @posts = @posts
      .limit(page_size)
      .offset((current_page - 1) * page_size)

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

    def page_size
      positive_number_or_default(params[:page_size], 10)
    end

    def current_page
      positive_number_or_default(params[:page], 1)
    end

    def positive_number_or_default(param, default = 1)
      number = param.to_i
      number.positive? ? number : default
    end

    def post_params
      params.require(:post).permit(:title, :description, :user_id, category_ids: [])
    end

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end
end
