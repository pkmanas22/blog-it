# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10000

  enum :status, { draft: "draft", published: "published" }, default: :draft

  belongs_to :user
  belongs_to :organization
  has_and_belongs_to_many :categories
  has_many :votes, dependent: :destroy

  validates :title,
    presence: true,
    length: { maximum: MAX_TITLE_LENGTH }
  validates :description,
    presence: true,
    length: { maximum: MAX_DESCRIPTION_LENGTH }
  validates :slug, uniqueness: true
  validates :user_id, presence: true
  validates :organization_id, presence: true
  validates_inclusion_of :is_bloggable, in: [true, false]
  validate :slug_not_changed, on: :update

  before_create :set_slug
  before_save :set_published_date

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_post_slug = Post.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_post_slug.present?
        slug_count = latest_post_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t("post.slug.immutable"))
      end
    end

    def set_published_date
      if will_save_change_to_status? && status == "published"
        self.last_published_date = Time.current
      end
    end

    def update_is_bloggable!
      net_votes = upvotes - downvotes
      is_bloggable = net_votes > Constants::BLOGGABLE_THRESHOLD_COUNT

      update_column(:is_bloggable, is_bloggable)
    end
end
