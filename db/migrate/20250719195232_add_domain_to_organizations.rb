# frozen_string_literal: true

class AddDomainToOrganizations < ActiveRecord::Migration[7.1]
  def change
    add_column :organizations, :domain, :string
    add_index :organizations, :domain, unique: true
  end
end
