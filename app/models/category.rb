# frozen_string_literal: true

class Category < ApplicationRecord
  has_and_belongs_to_many :posts
  belongs_to :organization

  validates :name, presence: true, uniqueness: { case_sensitive: false, scope: :organization_id }

  validates :organization_id, presence: true

  before_save :capitalize_name

  private

    def capitalize_name
      name.capitalize!
    end
end
