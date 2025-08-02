# frozen_string_literal: true

class Me::VotesController < ApplicationController
  def index
    @my_votes = current_user.votes
  end
end
