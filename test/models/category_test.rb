# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @category = create(:category, organization: @organization)
  end

  def test_valid_category_factory
    assert @category.valid?
  end

  def test_category_should_not_be_valid_and_saved_without_name
    @category.name = "  "
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_category_should_not_be_valid_and_saved_without_organization
    @category.organization = nil
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Organization must exist"
  end

  def test_category_name_should_be_case_insensitive
    @category.save!

    other_category = build(:category, organization: @organization, name: @category.name.upcase)
    assert_not other_category.valid?
  end

  def test_category_name_should_be_unique_within_same_organization
    @category.save!

    other_category = build(:category, organization: @organization, name: @category.name.upcase)
    other_category.valid?
    assert_includes other_category.errors.full_messages, "Name has already been taken"
  end

  def test_category_name_can_be_duplicated_in_different_organization
    @category.save!

    other_organization = create(:organization)
    category_in_other_org = build(:category, organization: other_organization, name: @category.name)
    assert category_in_other_org.valid?
  end

  def test_name_should_be_capitalized_before_save
    mixed_case_name = "tEstCaTeGoRy"
    @category.name = mixed_case_name
    @category.save!
    assert_equal mixed_case_name.capitalize, @category.reload.name
  end
end
