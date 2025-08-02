# frozen_string_literal: true

module LoadPost
  extend ActiveSupport::Concern

  included do
    before_action :load_post_by_slug!
  end

  private

    def load_post_by_slug!
      @post = current_organization.posts.find_by!(slug: params[:post_slug] || params[:slug])
    end
end
