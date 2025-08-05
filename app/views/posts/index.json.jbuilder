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

  json.my_vote @my_votes[post.id]
end

json.total_posts_count @posts.total_count
