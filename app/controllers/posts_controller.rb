# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    organization_id = current_user.organization_id

    @posts = Post
      .includes(:categories)
      .joins(:user)
      .where(users: { organization_id: organization_id })
      .order(updated_at: :desc)

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
    updated_params = post_params.merge({ user_id: current_user.id })
    post = Post.new(updated_params)
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
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
      params.require(:post).permit(:title, :description, category_ids: [])
    end

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end
end
