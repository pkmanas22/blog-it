# frozen_string_literal: true

class Posts::VotesController < ApplicationController
  include LoadPost

  before_action :load_post_by_slug!, only: %i[create]

  def create
    unless valid_vote_type?
      return render_error("Invalid type", :bad_request)
    end

    @vote = @post.votes.find_by(user: current_user)

    if @vote.nil?
      create_vote
    elsif is_same_vote_type?
      destroy_vote
    else
      update_vote
    end
  end

  private

    def vote_param_value
      params.require(:vote_type)
    end

    def valid_vote_type?
      Vote.vote_types.keys.include?(vote_param_value)
    end

    def is_same_vote_type?
      @vote.vote_type == vote_param_value
    end

    def create_vote
      @post.votes.create!(user: current_user, vote_type: vote_param_value)
      render_notice(t("successfully_created", entity: "Vote"))
    end

    def destroy_vote
      @vote.destroy!
      render_notice(t("successfully_deleted", entity: "Vote"))
    end

    def update_vote
      @vote.update!(vote_type: vote_param_value)
      render_notice(t("successfully_updated", entity: "Vote"))
    end
end
