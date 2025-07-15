# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @categories = Category.all
    render
  end

  def create
    category = Category.new(category_params)
    category.save!
    render_notice(t("successfullyCreated", model: Category.model_name.human))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
