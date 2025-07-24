# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :id, :title, :slug, :status, :last_published_date

  json.categories do
    json.array! post.categories do |category|
      json.extract! category, :id, :name
    end
  end
end

json.total_posts_count @posts.count
