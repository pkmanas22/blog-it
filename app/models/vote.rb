# frozen_string_literal: true

class Vote < ApplicationRecord
  enum :vote_type, { upvote: "upvote", downvote: "downvote" }

  belongs_to :user
  belongs_to :post

  after_create :increment_post_counters
  after_update :update_post_counters_if_vote_type_changed
  after_destroy :decrement_post_counters

  private

    def increment_post_counters
      increment_upvotes! if upvote?
      increment_downvotes! if downvote?

      post.send(:update_is_bloggable!)
    end

    def decrement_post_counters
      decrement_upvotes! if upvote?
      decrement_downvotes! if downvote?

      post.send(:update_is_bloggable!)
    end

    def update_post_counters_if_vote_type_changed
      return unless saved_change_to_vote_type?

      old_vote, new_vote = saved_change_to_vote_type

      case old_vote
      when "upvote"
        decrement_upvotes!
      when "downvote"
        decrement_downvotes!
      end

      case new_vote
      when "upvote"
        increment_upvotes!
      when "downvote"
        increment_downvotes!
      end

      post.send(:update_is_bloggable!)
    end

    def increment_upvotes!
      post.increment!(:upvotes)
    end

    def increment_downvotes!
      post.increment!(:downvotes)
    end

    def decrement_upvotes!
      post.decrement!(:upvotes) if post.upvotes > 0
    end

    def decrement_downvotes!
      post.decrement!(:downvotes) if post.downvotes > 0
    end
end
