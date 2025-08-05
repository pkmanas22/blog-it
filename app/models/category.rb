# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :organization

  has_and_belongs_to_many :posts

  validates :organization_id, presence: true
  validates :name,
    presence: true,
    uniqueness: { case_sensitive: false, scope: :organization_id }

  before_save :capitalize_name

  private

    def capitalize_name
      name.capitalize!
    end
end
