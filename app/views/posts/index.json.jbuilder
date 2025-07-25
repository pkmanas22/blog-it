# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :id, :title, :description, :slug, :last_published_date

  json.author do
    json.extract! post.user, :id, :name
  end

  json.categories do
    json.array! post.categories do |category|
      json.extract! category, :id, :name
    end
  end
end

json.total_posts_count @total_posts_count
