# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category1 = create(:category, organization: @organization)
    @category2 = create(:category, organization: @organization)
    @post = build(:post, user: @user, organization: @organization, categories: [@category1])
  end

  def test_values_of_created_at_and_updated_at
    post = Post.new(
      title: "This is a test post", description: "desc", is_bloggable: true, user: @user,
      organization: @organization)
    assert_nil post.created_at
    assert_nil post.updated_at

    post.save!
    assert_not_nil post.created_at
    assert_equal post.updated_at, post.created_at

    post.update!(title: "This is an updated post")
    assert_not_equal post.updated_at, post.created_at
  end

  def test_post_should_not_be_valid_without_title
    @post.title = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Title can't be blank"
  end

  def test_post_title_should_not_exceed_maximum_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert_not @post.valid?
  end

  def test_validation_should_accept_valid_titles
    valid_titles = ["Title", "Another_title", "Title!", "-title-", "_title_", "/title", "123"]

    valid_titles.each do |title|
      @post.title = title
      assert @post.valid?, "Expected '#{title}' to be valid"
    end
  end

  def test_post_should_not_be_valid_without_description
    @post.description = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Description can't be blank"
  end

  def test_post_description_should_not_exceed_maximum_length
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert_not @post.valid?
  end

  def test_is_bloggable_must_be_boolean
    @post.is_bloggable = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Is bloggable is not included in the list"

    @post.is_bloggable = true
    assert @post.valid?

    @post.is_bloggable = false
    assert @post.valid?
  end

  def test_post_should_not_be_valid_without_user
    @post.user = nil
    assert_not @post.save
    assert_includes @post.errors.full_messages, "User must exist"
  end

  def test_post_should_not_be_valid_without_organization
    @post.organization = nil
    assert_not @post.save
    assert_includes @post.errors.full_messages, "Organization must exist"
  end

  def test_post_count_increases_on_saving
    assert_difference "Post.count", 1 do
      @post.save!
    end
  end

  def test_post_count_decreases_on_deleting
    @post.save!
    assert_difference "Post.count", -1 do
      @post.destroy
    end
  end

  def test_post_slug_is_parameterized_title
    title = "My Example Post"
    @post.title = title
    @post.save!
    assert_equal title.parameterize, @post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_titles
    first_post = Post.create!(
      title: "test post", description: "desc", is_bloggable: true, user: @user,
      organization: @organization)
    second_post = Post.create!(
      title: "test post", description: "desc", is_bloggable: true, user: @user,
      organization: @organization)

    assert_equal "test-post", first_post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_slug_generation_for_posts_with_titles_one_being_prefix_of_the_other
    first_post = Post.create!(
      title: "fishing", description: "desc", is_bloggable: true, user: @user,
      organization: @organization)
    second_post = Post.create!(
      title: "fish", description: "desc", is_bloggable: true, user: @user,
      organization: @organization)

    assert_equal "fishing", first_post.slug
    assert_equal "fish", second_post.slug
  end

  def test_error_raised_for_duplicate_slug_update
    other_post = Post.create!(
      title: "another test post", description: "description", is_bloggable: true, user: @user,
      organization: @organization)

    assert_raises ActiveRecord::RecordInvalid do
      other_post.update!(slug: @post.slug)
    end

    error_msg = other_post.errors.full_messages.to_sentence
    assert_match I18n.t("post.slug.immutable"), error_msg
  end

  def test_updating_title_does_not_update_slug
    @post.save!
    assert_no_changes -> { @post.reload.slug } do
      updated_title = "updated post title"
      @post.update!(title: updated_title)
      assert_equal updated_title, @post.title
    end
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_exist
    title = "test-post"
    Post.create!(title:, description: "desc", is_bloggable: true, user: @user, organization: @organization)
    Post.create!(
      title:, description: "desc", is_bloggable: true, user: @user,
      organization: @organization)
    third_post = Post.create!(title:, description: "desc", is_bloggable: true, user: @user, organization: @organization)
    fourth_post = Post.create!(
      title:, description: "desc", is_bloggable: true, user: @user,
      organization: @organization)

    assert_equal "#{title.parameterize}-4", fourth_post.slug

    third_post.destroy

    expected_suffix_for_new_post = fourth_post.slug.split("-").last.to_i + 1

    new_post = Post.create!(title:, description: "desc", is_bloggable: true, user: @user, organization: @organization)
    assert_equal "#{title.parameterize}-#{expected_suffix_for_new_post}", new_post.slug
  end

  def test_existing_slug_prefixed_in_new_post_title_does_not_break_slug_generation
    longer_title = "buy milk and apple"
    new_title = "buy milk"

    existing_post = Post.create!(
      title: longer_title, description: "desc", is_bloggable: true, user: @user,
      organization: @organization)
    assert_equal longer_title.parameterize, existing_post.slug

    new_post = Post.create!(
      title: new_title, description: "desc", is_bloggable: true, user: @user,
      organization: @organization)
    assert_equal new_title.parameterize, new_post.slug
  end

  def test_title_with_numbered_slug_substring_does_not_affect_slug_generation
    title_with_number = "buy 2 apples"

    existing_post = Post.create!(
      title: title_with_number, description: "desc", is_bloggable: true, user: @user,
      organization: @organization)
    assert_equal title_with_number.parameterize, existing_post.slug

    substring_title = "buy"
    new_post = Post.create!(
      title: substring_title, description: "desc", is_bloggable: true, user: @user,
      organization: @organization)
    assert_equal substring_title.parameterize, new_post.slug
  end

  def test_creates_multiple_posts_with_unique_slugs
    posts = create_list(:post, 10, user: @user, organization: @organization, description: "desc", is_bloggable: true)
    slugs = posts.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end

  def test_posts_created_by_user_are_deleted_when_user_is_deleted
    post_owner = create(:user)
    create(:post, user: post_owner, organization: @organization)

    assert_difference "Post.count", -1 do
      post_owner.destroy
    end
  end

  def test_post_belongs_to_user
    assert_equal @user, @post.user
  end

  def test_post_belongs_to_organization
    assert_equal @organization, @post.organization
  end

  def test_post_can_have_multiple_categories
    @post.categories << @category2
    assert_includes @post.categories, @category1
    assert_includes @post.categories, @category2
  end

  def test_status_enum_defaults_to_draft
    post = build(:post, user: @user, organization: @organization)
    assert_equal "draft", post.status
  end

  def test_status_enum_accepts_valid_values
    @post.status = "draft"
    assert @post.valid?
    @post.status = "published"
    assert @post.valid?
  end

  def test_published_date_set_when_status_changes_to_published
    @post.status = "draft"
    @post.save!

    travel_to 1.hour.from_now do
      @post.status = "published"
      @post.save!
      assert_not_nil @post.last_published_date
      assert_in_delta Time.current, @post.last_published_date, 1.second
    end
  end

  def test_published_date_does_not_change_if_status_remains_same
    @post.status = "draft"
    @post.save!
    original_date = @post.last_published_date

    @post.title = "Changed Title"
    @post.save!
    assert_equal original_date, @post.reload.last_published_date
  end
end
