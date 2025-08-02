# frozen_string_literal: true

class Vote < ApplicationRecord
  enum :vote_type, { upvote: "upvote", downvote: "downvote" }

  belongs_to :user
  belongs_to :post
end
