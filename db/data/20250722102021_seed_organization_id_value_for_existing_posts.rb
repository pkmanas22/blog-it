# frozen_string_literal: true

class SeedOrganizationIdValueForExistingPosts < ActiveRecord::Migration[7.1]
  def up
    Post.find_each do |post|
      post.update_column(:organization_id, post.user.organization_id)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
