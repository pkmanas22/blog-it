# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :id, :title, :description, :slug, :last_published_date, :is_bloggable

  json.author do
    json.extract! post.user, :id, :name
  end

  json.categories do
    json.array! post.categories do |category|
      json.extract! category, :id, :name
    end
  end

  json.net_votes post.upvotes - post.downvotes
end

json.total_posts_count @total_posts_count
