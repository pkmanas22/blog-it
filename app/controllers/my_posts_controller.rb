# frozen_string_literal: true

class MyPostsController < ApplicationController
  after_action :verify_policy_scoped, only: :index

  def index
    posts = policy_scope(Post, policy_scope_class: MyPostPolicy::Scope)

    @posts = posts.order(created_at: :desc)

    @posts = PostFilterService.new(@posts, params).process!

    @total_posts_count = @posts.count

    @posts = @posts.page(params[:page]).per(params[:page_size])
  end
end
