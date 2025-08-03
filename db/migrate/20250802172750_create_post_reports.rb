# frozen_string_literal: true

class CreatePostReports < ActiveRecord::Migration[7.1]
  def change
    create_table :post_reports do |t|
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
