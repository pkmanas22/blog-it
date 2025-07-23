# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update]

  def index
    @posts = Organization.find(current_user.organization_id).posts.order(updated_at: :desc)

    if params[:category].present?
      @posts = @posts.for_categories(params[:category])
    end

    @posts = @posts
      .limit(page_size)
      .offset(offset)
  end

  def create
    post = current_user.posts.new(post_params.merge({ organization_id: current_user.organization_id }))
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    render
  end

  def update
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post"))
  end

  private

    def offset
      (current_page - 1) * page_size
    end

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
      @post = current_organization.posts.find_by!(slug: params[:slug])
    end
end
