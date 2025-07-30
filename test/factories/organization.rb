# frozen_string_literal: true

FactoryBot.define do
  factory :organization do
    name { Faker::Company.name }
    domain { Faker::Internet.unique.domain_name }
  end
end
