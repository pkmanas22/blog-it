# frozen_string_literal: true

class MyPostsController < ApplicationController
  after_action :verify_policy_scoped, only: :index

  def index
    posts = policy_scope(Post, policy_scope_class: MyPostPolicy::Scope)

    @posts = posts.order(created_at: :desc)
  end
end
