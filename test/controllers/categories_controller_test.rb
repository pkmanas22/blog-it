# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @headers = headers(@user)

    @category1 = create(:category, organization: @organization, created_at: 1.day.ago)
    @category2 = create(:category, organization: @organization, created_at: 2.days.ago)

    other_org = create(:organization)
    create(:category, organization: other_org)
  end

  def test_index_returns_policy_scoped_categories_ordered_by_created_at_desc
    get categories_path, headers: @headers

    assert_response :success

    returned_categories = response.parsed_body["categories"]
    returned_ids = returned_categories.map { |c| c["id"] }
    expected_ids = [@category1, @category2].sort_by(&:created_at).reverse.map(&:id)

    assert_equal expected_ids, returned_ids
  end

  def test_create_category_with_valid_params
    category_params = { name: "New Category" }

    assert_difference "Category.count", 1 do
      post categories_path, params: { category: category_params }, headers: @headers, as: :json
    end

    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Category"), response_json["notice"]

    category = Category.last
    assert_equal category_params[:name].capitalize, category.name
    assert_equal @organization.id, category.organization_id
  end

  def test_create_category_without_name_fails
    invalid_params = { name: "" }

    assert_no_difference "Category.count" do
      post categories_path, params: { category: invalid_params }, headers: @headers, as: :json
    end

    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_includes response_json["error"], "Name can't be blank"
  end
end
