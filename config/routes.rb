# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, except: %i[new edit], param: :slug do
      resource :vote, only: %i[create], module: :posts
      resource :report, only: %i[create], module: :posts do
        get :download
      end
    end
    resources :categories, only: %i[index create]
    resources :users, only: :create
    resource :session, only: %i[create destroy]
    namespace :me do
      resources :posts, only: %i[index] do
        collection do
          patch :bulk_update_status
          delete :bulk_destroy
        end
      end

      resources :votes, only: %i[index]
    end

  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
