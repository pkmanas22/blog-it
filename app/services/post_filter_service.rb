# frozen_string_literal: true

class PostFilterService
  attr_reader :posts, :params

  def initialize(posts, params = {})
    @posts = posts
    @params = params
  end

  def process!
    filter_by_category
    filter_by_title
    filter_by_status

    posts
  end

  private

    def filter_by_category
      category = params[:category]
      return nil if category.blank?

      @posts = posts.joins(:categories)
        .where("LOWER(categories.name) IN (?)", Array(category).map(&:downcase))
        .distinct
    end

    def filter_by_title
      title = params[:title]
      return nil if title.blank?

      @posts = posts.where("title LIKE ?", "%#{title}%")
    end

    def filter_by_status
      status = params[:status]
      return nil if status.blank?

      @posts = posts.where(status: status.downcase)
    end
end
