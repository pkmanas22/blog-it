# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    association :organization
    title { Faker::Lorem.sentence(word_count: 3) }
    description { Faker::Lorem.paragraph(sentence_count: 5) }
    upvotes { Faker::Number.between(from: 0, to: 100) }
    downvotes { Faker::Number.between(from: 0, to: 100) }
    is_bloggable { Faker::Boolean.boolean }
    status { %w[draft published].sample }
    user { build(:user, organization: organization) }

    after(:create) do |post|
      categories = create_list(:category, Faker::Number.between(from: 1, to: 3), organization: post.organization)
      post.categories << categories
    end
  end
end
