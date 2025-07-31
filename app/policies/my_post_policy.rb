# frozen_string_literal: true

class MyPostPolicy
  attr_reader :user, :posts

  def initialize(user, posts)
    @user = user
    @posts = posts
  end

  def bulk_update_status?
    posts.where.not(user_id: user.id).none?
  end

  def bulk_destroy?
    posts.where.not(user_id: user.id).none?
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(user_id: user.id)
    end
  end
end
