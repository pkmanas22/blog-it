# frozen_string_literal: true

class MakeUserIdNotNullInPosts < ActiveRecord::Migration[7.1]
  def change
    change_column_null :posts, :user_id, false
  end
end
