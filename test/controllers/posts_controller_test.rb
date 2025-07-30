# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @headers = headers(@user)

    @category1 = create(:category, organization: @organization)
    @category2 = create(:category, organization: @organization)

    @post = create(
      :post,
      user: @user,
      organization: @organization,
      categories: [@category1],
      last_published_date: 1.day.ago,
      status: "published"
    )

    @controller.singleton_class.class_eval do
      define_method(:current_organization) { @organization }
      define_method(:current_user) { @user }
    end
  end

  def test_index_should_return_policy_scoped_posts_ordered
    get posts_path, headers: @headers
    assert_response :success

    body = response.parsed_body
    posts = body["posts"]
    assert posts.any? { |p| p["id"] == @post.id }

    assert posts.first.key?("id")
    assert posts.first.key?("title")
    assert body.key?("total_posts_count")
  end

  def test_index_should_filter_posts_by_category
    post_with_cat2 = create(
      :post,
      user: @user,
      organization: @organization,
      categories: [@category2],
      status: "published",
      last_published_date: 2.days.ago
    )

    get posts_path, params: { category: @category2.name }, headers: @headers
    assert_response :success

    post_ids = response.parsed_body["posts"].map { |p| p["id"] }
    assert_includes post_ids, post_with_cat2.id
    refute_includes post_ids, @post.id
  end

  def test_index_filters_posts_by_nonexistent_category_returns_empty
    get posts_path, params: { category: "nonexistent-category" }, headers: @headers
    assert_response :success

    assert_empty response.parsed_body["posts"]
  end

  def test_index_should_paginate_posts
    create_list(:post, 15, user: @user, organization: @organization, status: "published")

    get posts_path, params: { page: 1, page_size: 5 }, headers: @headers
    assert_response :success

    posts = response.parsed_body["posts"]
    assert_equal 5, posts.size
    assert response.parsed_body.key?("total_posts_count")
  end

  def test_create_post_with_valid_params
    params = { title: "New Post", description: "Post description", status: "published", category_ids: [@category1.id] }
    assert_difference "Post.count", 1 do
      post posts_path, params: { post: params }, headers: @headers, as: :json
    end
    assert_response :success

    json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Post"), json["notice"]
  end

  def test_create_fails_with_invalid_title
    params = { description: "Post description", status: "published", category_ids: [@category1.id] }

    assert_no_difference "Post.count" do
      post posts_path, params: { post: params }, headers: @headers, as: :json
    end
    assert_response :unprocessable_entity

    json = response.parsed_body
    assert_includes json["error"], "Title can't be blank"
  end

  def test_create_ignores_unpermitted_params_and_sets_organization_internally
    params = {
      title: "New Post",
      description: "Desc",
      status: "published",
      category_ids: [@category1.id],
      user_id: 9999,
      organization_id: 9999,
      is_bloggable: true
    }
    assert_difference "Post.count", 1 do
      post posts_path, params: { post: params }, headers: @headers, as: :json
    end
    assert_response :success

    post = Post.last
    assert_equal @user.id, post.user_id
    assert_equal @organization.id, post.organization_id
    refute post.respond_to?(:is_bloggable) && post.is_bloggable == true
  end

  def test_show_post_success
    get post_path(@post.slug), headers: @headers
    assert_response :success

    post_json = response.parsed_body["post"]
    assert_equal @post.id, post_json["id"]
  end

  def test_show_post_not_found
    get post_path("non-existent-slug"), headers: @headers
    assert_response :not_found

    json = response.parsed_body
    assert_equal I18n.t("not_found", entity: "Post"), json["error"]
  end

  def test_update_post_with_valid_params
    update_params = { title: "Updated Title", category_ids: [@category2.id] }
    put post_path(@post.slug), params: { post: update_params }, headers: @headers, as: :json
    assert_response :success

    @post.reload
    assert_equal "Updated Title", @post.title
    assert_equal [@category2.id], @post.categories.pluck(:id)
  end

  def test_update_post_with_invalid_params
    invalid_params = { title: "" }
    put post_path(@post.slug), params: { post: invalid_params }, headers: @headers, as: :json
    assert_response :unprocessable_entity

    json = response.parsed_body
    assert_includes json["error"], "Title can't be blank"
  end

  def test_update_denies_non_owner_in_same_org
    other_user = create(:user, organization: @organization)
    other_headers = headers(other_user)

    put post_path(@post.slug), params: { post: { title: "Updated by other" } }, headers: other_headers, as: :json
    assert_response :forbidden

    json = response.parsed_body
    assert_equal I18n.t("authorization.denied"), json["error"]
  end

  def test_destroy_post_success
    assert_difference "Post.count", -1 do
      delete post_path(@post.slug), headers: @headers, as: :json
    end
    assert_response :success

    json = response.parsed_body
    assert_equal I18n.t("successfully_deleted", entity: "Post"), json["notice"]
  end

  def test_destroy_denies_non_owner_in_same_org
    other_user = create(:user, organization: @organization)
    other_headers = headers(other_user)

    delete post_path(@post.slug), headers: other_headers, as: :json
    assert_response :forbidden

    json = response.parsed_body
    assert_equal I18n.t("authorization.denied"), json["error"]
  end

  def test_unauthorized_access_should_be_not_found
    other_org = create(:organization)
    other_user = create(:user, organization: other_org)
    other_headers = headers(other_user)

    put post_path(@post.slug), params: { post: { title: "No Access" } }, headers: other_headers, as: :json
    assert_response :not_found

    delete post_path(@post.slug), headers: other_headers, as: :json
    assert_response :not_found

    json = response.parsed_body
    assert_equal I18n.t("not_found", entity: "Post"), json["error"]
  end

  def test_show_allows_owner_to_see_draft_post
    draft_post = create(:post, user: @user, organization: @organization, status: "draft")
    get post_path(draft_post.slug), headers: @headers
    assert_response :success
    assert_equal draft_post.id, response.parsed_body["post"]["id"]
  end

  def test_show_denies_draft_post_to_other_user_in_same_org
    draft_post = create(:post, user: @user, organization: @organization, status: "draft")
    other_user = create(:user, organization: @organization)
    other_headers = headers(other_user)

    get post_path(draft_post.slug), headers: other_headers
    assert_response :forbidden

    json = response.parsed_body
    assert_equal I18n.t("authorization.denied"), json["error"]
  end
end
