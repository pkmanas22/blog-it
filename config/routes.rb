# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, only: %i[index show create], param: :slug, defaults: { format: "json" }
    resources :categories, only: :index
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
