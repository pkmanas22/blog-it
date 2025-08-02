# frozen_string_literal: true

require "test_helper"

class Me::PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @headers = headers(@user)

    @user_posts = create_list(:post, 3, user: @user, organization: @organization, status: "draft")
  end

  def test_index_should_return_only_users_posts
    user_posts = create_list(:post, 5, user: @user, organization: @organization)
    other_user = create(:user, organization: @organization)
    other_posts = create_list(:post, 8, user: other_user, organization: @organization)

    get me_posts_path, headers: @headers
    assert_response :success

    returned_post_ids = response.parsed_body["posts"].map { |post| post["id"] }
    expected_post_ids = user_posts.map(&:id)

    assert_equal expected_post_ids.sort, returned_post_ids.sort

    other_posts.each do |post|
      refute_includes returned_post_ids, post.id
    end
  end

  def test_bulk_update_status_should_update_status_and_timestamps
    post_ids = @user_posts.map(&:id)
    new_status = "published"

    patch bulk_update_status_me_posts_path, headers: @headers, params: {
      bulk: {
        status: new_status,
        post_ids: post_ids
      }
    }

    assert_response :success
    @user_posts.each do |post|
      post.reload
      assert_equal new_status, post.status
      assert_not_nil post.last_published_date if new_status == "published"
    end
    assert_includes response.parsed_body["notice"], I18n.t("success")
  end

  def test_bulk_update_status_should_not_update_if_status_same
    @user_posts.each { |p| p.update!(status: "published", last_published_date: 1.day.ago) }
    post_ids = @user_posts.map(&:id)
    new_status = "published"

    patch bulk_update_status_me_posts_path, headers: @headers, params: {
      bulk: {
        status: new_status,
        post_ids: post_ids
      }
    }

    assert_response :success
    @user_posts.each do |post|
      post.reload
      assert_equal new_status, post.status
      assert post.last_published_date < Time.current
    end
  end

  def test_bulk_update_status_unauthorized_user_should_raise
    other_user = create(:user, organization: @organization)
    other_posts = create_list(:post, 2, user: other_user, organization: @organization)

    patch bulk_update_status_me_posts_path, headers: @headers, params: {
      bulk: {
        status: "archived",
        post_ids: other_posts.map(&:id)
      }
    }

    assert_response :forbidden
  end

  def test_bulk_destroy_should_delete_user_posts
    post_ids = @user_posts.map(&:id)

    delete bulk_destroy_me_posts_path, headers: @headers, params: {
      bulk: {
        post_ids: post_ids
      }
    }

    assert_response :success
    post_ids.each do |id|
      assert_nil Post.find_by(id: id)
    end
    assert_includes response.parsed_body["notice"], I18n.t("success")
  end

  def test_bulk_destroy_unauthorized_user_should_raise
    other_user = create(:user, organization: @organization)
    other_posts = create_list(:post, 2, user: other_user, organization: @organization)

    delete bulk_destroy_me_posts_path, headers: @headers, params: {
      bulk: {
        post_ids: other_posts.map(&:id)
      }
    }

    assert_response :forbidden
  end

  def test_bulk_update_status_with_empty_post_ids_should_not_update_anything
    patch bulk_update_status_me_posts_path, headers: @headers, params: {
      bulk: {
        status: "archived",
        post_ids: []
      }
    }
    assert_response :success
    assert_includes response.parsed_body["notice"], I18n.t("success")
  end

  def test_bulk_destroy_with_empty_post_ids_should_not_delete_anything
    delete bulk_destroy_me_posts_path, headers: @headers, params: {
      bulk: {
        post_ids: []
      }
    }
    assert_response :success
    assert_includes response.parsed_body["notice"], I18n.t("success")
  end
end
