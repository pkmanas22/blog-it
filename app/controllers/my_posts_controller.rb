# frozen_string_literal: true

class MyPostsController < ApplicationController
  def index
    @posts = current_user.posts.order(created_at: :desc)
  end
end
