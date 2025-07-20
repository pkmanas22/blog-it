# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def create
    updated_params = user_params.merge({ organization_id: get_organization_id })

    user = User.new(updated_params)
    user.save!
    render_notice(t("successfully_created", entity: "User"))
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def get_organization_id
      domain = user_params[:email].split("@").last

      organization = Organization.find_or_create_by!(domain: domain) do |org|
        org.name = domain
      end
      organization.id
    end
end
