# frozen_string_literal: true

class PostReport < ApplicationRecord
  belongs_to :user
  belongs_to :post

  has_one_attached :report_pdf
end
