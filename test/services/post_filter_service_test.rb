# frozen_string_literal: true

require "test_helper"

class PostFilterServiceTest < ActiveSupport::TestCase
  def setup
    organization = create(:organization)
    user = create(:user, organization: organization)
    @category1 = create(:category, organization: organization, name: "Tech")
    @category2 = create(:category, organization: organization, name: "Health")

    @post1 = create(
      :post, user: user, organization: organization, title: "Tech Innovations", status: "published",
      categories: [@category1]
    )
    @post2 = create(
      :post, user: user, organization: organization, title: "Health Tips", status: "draft",
      categories: [@category2]
    )
    @post3 = create(
      :post, user: user, organization: organization, title: "Tech Advances", status: "published",
      categories: [@category1]
    )

    @posts = Post.all
  end

  def test_filter_by_all_params_combined
    service = PostFilterService.new(@posts, category: "tech", title: "Tech Advances", status: "published")
    filtered_posts = service.process!

    assert_includes filtered_posts, @post3
    refute_includes filtered_posts, @post1
    refute_includes filtered_posts, @post2
  end

  def test_filter_by_category_returns_posts_with_matching_category
    service = PostFilterService.new(@posts, category: "tech")
    filtered_posts = service.process!

    assert_includes filtered_posts, @post1
    assert_includes filtered_posts, @post3
    refute_includes filtered_posts, @post2
  end

  def test_filter_by_category_is_case_insensitive_and_handles_array
    service = PostFilterService.new(@posts, category: ["TECH", "Health"])
    filtered_posts = service.process!

    assert_includes filtered_posts, @post1
    assert_includes filtered_posts, @post2
    assert_includes filtered_posts, @post3
  end

  def test_filter_by_title_returns_posts_containing_title_substring
    service = PostFilterService.new(@posts, title: "Tech")
    filtered_posts = service.process!

    assert_includes filtered_posts, @post1
    assert_includes filtered_posts, @post3
    refute_includes filtered_posts, @post2
  end

  def test_filter_by_status_returns_posts_with_exact_status
    service = PostFilterService.new(@posts, status: "PUBLISHED")
    filtered_posts = service.process!

    assert_includes filtered_posts, @post1
    refute_includes filtered_posts, @post2
    assert_includes filtered_posts, @post3
  end

  def test_returns_all_posts_if_no_filter_params
    service = PostFilterService.new(@posts)
    filtered_posts = service.process!

    assert_equal @posts.sort, filtered_posts.sort
  end

  def test_returns_empty_relation_if_no_posts_match_filters
    service = PostFilterService.new(@posts, category: "nonexistent", status: "unknown")
    filtered_posts = service.process!

    assert filtered_posts.empty?
  end
end
