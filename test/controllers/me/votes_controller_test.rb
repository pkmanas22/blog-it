# frozen_string_literal: true

require "test_helper"

class Me::VotesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @headers = headers(@user)

    @other_user = create(:user, organization: @organization)

    @post1 = create(:post, user: @user, organization: @organization)
    @post2 = create(:post, user: @user, organization: @organization)

    @vote1 = create(:vote, user: @user, post: @post1, vote_type: "upvote")
    @vote2 = create(:vote, user: @user, post: @post2, vote_type: "downvote")

    @other_vote = create(:vote, user: @other_user, post: @post1, vote_type: "upvote")

    @controller.singleton_class.class_eval do
      define_method(:current_user) { @user }
    end
  end

  def test_index_returns_only_current_user_votes
    get me_votes_path, headers: @headers, as: :json
    assert_response :success

    votes = response.parsed_body["votes"]
    assert votes.present?

    vote_ids = votes.map { |v| v["id"] }
    assert_includes vote_ids, @vote1.id
    assert_includes vote_ids, @vote2.id
    refute_includes vote_ids, @other_vote.id
  end

  def test_index_returns_empty_array_when_no_votes
    new_user = create(:user, organization: @organization)
    new_headers = headers(new_user)
    @controller.singleton_class.class_eval do
      define_method(:current_user) { new_user }
    end

    get me_votes_path, headers: new_headers, as: :json
    assert_response :success

    votes = response.parsed_body["votes"]
    assert_equal [], votes
  end
end
