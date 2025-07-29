# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @valid_user_params = {
      name: "Manas Kumar Pradhan",
      email: "manas@px.com",
      password: "welcome",
      password_confirmation: "welcome"
    }
  end

  def test_should_create_user_with_valid_params
    assert_difference "User.count", 1 do
      post users_path, params: { user: @valid_user_params }, as: :json
    end

    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "User"), response_json["notice"]

    user = User.last
    assert_equal @valid_user_params[:name], user.name
    assert_equal @valid_user_params[:email], user.email

    domain = @valid_user_params[:email].split("@").last
    organization = Organization.find_by(domain: domain)
    assert_equal organization.id, user.organization_id
  end

  def test_should_not_create_user_without_required_fields
    invalid_params = {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    }

    assert_no_difference "User.count" do
      post users_path, params: { user: invalid_params }, as: :json
    end

    assert_response :unprocessable_entity
  end

  def test_should_create_organization_if_not_exists
    domain = "newdomain.com"
    params = @valid_user_params.merge(email: "manas@#{domain}")

    assert_difference "Organization.count", 1 do
      post users_path, params: { user: params }, as: :json
    end

    organization = Organization.find_by(domain: domain)
    assert_not_nil organization
  end

  def test_should_reuse_existing_organization
    domain = "existing.com"
    existing_org = Organization.create!(domain: domain, name: domain)
    params = @valid_user_params.merge(email: "manas@#{domain}")

    assert_no_difference "Organization.count" do
      post users_path, params: { user: params }, as: :json
    end

    user = User.last
    assert_equal existing_org.id, user.organization_id
  end
end
