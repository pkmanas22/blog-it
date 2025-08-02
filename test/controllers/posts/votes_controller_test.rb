# frozen_string_literal: true

require "test_helper"

class Posts::VotesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @headers = headers(@user)

    @post = create(:post, user: @user, organization: @organization)

    @controller.singleton_class.class_eval do
      define_method(:current_organization) { @organization }
      define_method(:current_user) { @user }
    end
  end

  def test_create_vote_when_no_existing_vote
    assert_difference -> { @post.votes.count }, 1 do
      post post_vote_path(@post.slug), params: { vote_type: "upvote" }, headers: @headers, as: :json
    end

    assert_response :success
    json = response.parsed_body
    assert_equal I18n.t("success"), json["notice"]
  end

  def test_destroy_vote_when_same_vote_type_submitted_again
    vote = create(:vote, user: @user, post: @post, vote_type: "upvote")

    assert_difference -> { @post.votes.count }, -1 do
      post post_vote_path(@post.slug), params: { vote_type: "upvote" }, headers: @headers, as: :json
    end

    assert_response :success
    json = response.parsed_body
    assert_equal I18n.t("success"), json["notice"]
  end

  def test_update_vote_when_different_vote_type_submitted
    vote = create(:vote, user: @user, post: @post, vote_type: "downvote")

    assert_no_difference -> { @post.votes.count } do
      post post_vote_path(@post.slug), params: { vote_type: "upvote" }, headers: @headers, as: :json
    end

    assert_response :success
    json = response.parsed_body
    assert_equal I18n.t("success"), json["notice"]
    assert_equal "upvote", vote.reload.vote_type
  end

  def test_return_bad_request_for_invalid_vote_type
    post post_vote_path(@post.slug), params: { vote_type: "invalid_type" }, headers: @headers, as: :json
    assert_response :bad_request
    json = response.parsed_body
    assert_equal "Invalid type", json["error"]
  end
end
