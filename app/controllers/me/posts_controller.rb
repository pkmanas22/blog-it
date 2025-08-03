# frozen_string_literal: true

class Me::PostsController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  before_action :authorize_posts!, only: %i[bulk_update_status bulk_destroy]

  def index
    posts = policy_scope(Post, policy_scope_class: MyPostPolicy::Scope)
    @posts = PostFilterService.new(posts, params).process!

    @total_posts_count = @posts.count

    @posts = @posts
      .order(created_at: :desc)
      .page(params[:page])
      .per(params[:page_size])
  end

  def bulk_update_status
    status = bulk_params[:status]
    posts_to_update = @posts_to_update.where.not(status: status)

    if status == "published"
      posts_to_update.update_all(
        status: status,
        last_published_date: Time.current,
        updated_at: Time.current
      )
    else
      posts_to_update.update_all(
        status: status,
        updated_at: Time.current
      )
    end

    render_notice(t("success"))
  end

  def bulk_destroy
    @posts_to_update.delete_all
    render_notice(t("success"))
  end

  private

    def bulk_params
      params.require(:bulk).permit(:status, post_ids: [])
    end

    def authorize_posts!
      @posts_to_update = Post.where(id: bulk_params[:post_ids])
      authorize @posts_to_update, policy_class: MyPostPolicy
    end
end
