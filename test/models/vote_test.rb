# frozen_string_literal: true

require "test_helper"

class VoteTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @post = create(:post, user: @user)
    @vote = create(:vote, user: @user, post: @post, vote_type: "upvote")
  end

  def test_valid_vote_factory
    assert @vote.valid?
  end

  def test_vote_should_not_be_valid_without_user
    @vote.user = nil
    assert_not @vote.valid?
    assert_includes @vote.errors.full_messages, "User must exist"
  end

  def test_vote_should_not_be_valid_without_post
    @vote.post = nil
    assert_not @vote.valid?
    assert_includes @vote.errors.full_messages, "Post must exist"
  end

  def test_vote_should_not_be_valid_without_vote_type
    @vote.vote_type = nil
    assert_not @vote.valid?
    assert_includes @vote.errors.full_messages, "Vote type can't be blank"
  end

  def test_upvotes_counter_increments_after_create_vote
    post = create(:post, user: @user, upvotes: 0)
    vote = build(:vote, user: @user, post: post, vote_type: "upvote")
    assert_difference "post.reload.upvotes", 1 do
      vote.save!
    end
  end

  def test_downvotes_counter_increments_after_create_vote
    post = create(:post, user: @user, downvotes: 0)
    vote = build(:vote, user: @user, post: post, vote_type: "downvote")
    assert_difference "post.reload.downvotes", 1 do
      vote.save!
    end
  end

  def test_upvotes_counter_decrements_after_destroy_upvote
    post = create(:post, user: @user, upvotes: 1)
    vote = create(:vote, user: @user, post: post, vote_type: "upvote")
    assert_difference "post.reload.upvotes", -1 do
      vote.destroy
    end
  end

  def test_downvotes_counter_decrements_after_destroy_downvote
    post = create(:post, user: @user, downvotes: 1)
    vote = create(:vote, user: @user, post: post, vote_type: "downvote")
    assert_difference "post.reload.downvotes", -1 do
      vote.destroy
    end
  end

  def test_vote_type_change_updates_post_counters
    post = create(:post, user: @user, upvotes: 0, downvotes: 1)
    vote = create(:vote, user: @user, post: post, vote_type: "downvote")

    assert_difference "post.reload.upvotes", 1 do
      assert_difference "post.downvotes", -1 do
        vote.update!(vote_type: "upvote")
      end
    end
  end
end
