# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Job

  def perform(user_id, post_slug)
    ActionCable.server.broadcast(user_id, { message: "Rendering the report", progress: 25 })

    user = User.find(user_id)
    post = Post.find_by!(slug: post_slug)

    html_report = ApplicationController.render(
      template: "posts/report/download",
      layout: "pdf",
      assigns: { post: post, user: user }
    )
    ActionCable.server.broadcast(user_id, { message: "Generating the PDF report", progress: 50 })

    pdf_blob = WickedPdf.new.pdf_from_string(html_report)

    ActionCable.server.broadcast(user_id, { message: "Uploading to server", progress: 75 })

    post_report = PostReport.find_or_initialize_by(user: user, post: post)

    post_report.report_pdf.purge_later if post_report.report_pdf.attached?

    post_report.report_pdf.attach(
      io: StringIO.new(pdf_blob),
      filename: "report_#{user.id}_#{post.slug}.pdf",
      content_type: "application/pdf"
    )
    post_report.save!

    ActionCable.server.broadcast(user_id, { message: "Report generation completed", progress: 100 })
  end
end
