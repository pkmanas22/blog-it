# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @categories = current_organization.categories.order(created_at: :desc)
  end

  def create
    category = current_organization.categories.new(category_params)
    category.save!
    render_notice(t("successfully_created", entity: "Category"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
