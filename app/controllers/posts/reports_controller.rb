# frozen_string_literal: true

class Posts::ReportsController < ApplicationController
  include LoadPost

  before_action :load_post_by_slug!, only: %i[download]

  def create
    ReportsJob.perform_async(current_user.id, post_slug)
  end

  def download
    post_report = PostReport.find_by(user: current_user, post: @post)

    unless post_report&.report_pdf&.attached?
      render_error(t("not_found", entity: "report"), :not_found) and return
    end

    send_data post_report.report_pdf.download,
      filename: "report_#{current_user.id}_#{@post.slug}.pdf",
      type: "application/pdf",
      disposition: "attachment"
  end

  private

    def post_slug
      params[:post_slug]
    end
end
