# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiExceptions
  include Authenticable
  include Pundit::Authorization

  def current_user
    @current_user
  end

  def current_organization
    @current_user.organization
  end
end
