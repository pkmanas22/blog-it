# frozen_string_literal: true

json.votes @my_votes do |vote|
  json.extract! vote, :id, :post_id, :vote_type
end
