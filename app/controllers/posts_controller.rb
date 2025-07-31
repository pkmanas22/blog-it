# frozen_string_literal: true

class PostsController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  before_action :load_post!, only: %i[show update destroy]
  before_action :authorize_post!, only: %i[show update destroy]

  def index
    posts = policy_scope(Post, policy_scope_class: PostPolicy::Scope)
    @posts = posts.order(last_published_date: :desc)

    @posts = PostFilterService.new(@posts, params).process!

    @total_posts_count = @posts.count

    @posts = @posts.page(params[:page]).per(params[:page_size])
  end

  def create
    post = current_user.posts.new(post_params.merge({ organization_id: current_user.organization_id }))
    authorize post
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
  end

  def update
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post"))
  end

  def destroy
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :status, category_ids: [])
    end

    def load_post!
      @post = current_organization.posts.find_by!(slug: params[:slug])
    end

    def authorize_post!
      authorize @post
    end
end
