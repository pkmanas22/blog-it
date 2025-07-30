# frozen_string_literal: true

require "test_helper"

class MyPostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @headers = headers(@user)
  end

  def test_index_should_return_only_users_posts
    user_posts = create_list(:post, 5, user: @user, organization: @organization)
    other_user = create(:user, organization: @organization)
    other_posts = create_list(:post, 8, user: other_user, organization: @organization)

    get my_posts_path, headers: @headers
    assert_response :success

    returned_post_ids = response.parsed_body["posts"].map { |post| post["id"] }
    expected_post_ids = user_posts.map(&:id)

    assert_equal expected_post_ids.sort, returned_post_ids.sort

    other_posts.each do |post|
      refute_includes returned_post_ids, post.id
    end
  end
end
