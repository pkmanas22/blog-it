# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
  end

  def test_organization_should_not_be_valid_and_saved_without_name
    @organization.name = ""
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Name can't be blank"
  end

  def test_organization_should_not_be_valid_and_saved_without_domain
    @organization.domain = ""
    assert_not @organization.valid?

    @organization.save
    assert_includes @organization.errors.full_messages, "Domain can't be blank", "Domain is invalid"
  end

  def test_organization_should_not_be_valid_and_saved_if_domain_not_unique
    @organization.save!

    test_organization = @organization.dup
    assert_not test_organization.valid?

    assert_includes test_organization.errors.full_messages, "Domain has already been taken"
    assert_includes test_organization.errors.full_messages, "Name has already been taken"
  end

  def test_validation_should_reject_invalid_domain
    @organization.domain = "XYZ"
    assert_not @organization.valid?

    assert_includes @organization.errors.full_messages, "Domain is invalid"
  end

  def test_domain_should_be_saved_in_lowercase
    uppercase_domain = "EXAMPLE.COM"
    @organization.domain = uppercase_domain
    @organization.save!
    assert_equal uppercase_domain.downcase, @organization.domain
  end
end
