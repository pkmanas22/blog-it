# frozen_string_literal: true

class Posts::ReportsController < ApplicationController
  def create
    ReportsJob.perform_async(current_user.id, post_slug)
  end

  def download
    if File.exist?(report_path)
      send_file(
        report_path,
        type: "application/pdf",
        filename: pdf_file_name,
        disposition: "attachment"
      )
    else
      render_error(t("not_found", entity: "report"), :not_found)
    end
  end

  private

    def report_path
      @_report_path ||= Rails.root.join("tmp/post_reports/#{pdf_file_name}")
    end

    def pdf_file_name
      "#{post_slug}_report.pdf"
    end

    def post_slug
      params[:post_slug]
    end
end
