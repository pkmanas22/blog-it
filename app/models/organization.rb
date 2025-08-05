# frozen_string_literal: true

class Organization < ApplicationRecord
  VALID_DOMAIN_REGEX = /(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/i

  has_many :users, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :categories, dependent: :destroy

  validates :name,
    presence: true,
    uniqueness: true
  validates :domain,
    presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: VALID_DOMAIN_REGEX }

  before_save :to_lowercase

  private

    def to_lowercase
      domain.downcase!
    end
end
