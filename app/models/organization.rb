# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :users
  has_many :posts
  has_many :categories

  validates :name,
    presence: true,
    uniqueness: true
  validates :domain,
    presence: true,
    uniqueness: { case_sensitive: false }

  before_save :to_lowercase

  private

    def to_lowercase
      domain.downcase!
    end
end
