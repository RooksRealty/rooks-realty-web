class UpdateListingsTable < ActiveRecord::Migration
  def change
  	add_column :listings, :short_description, :string
  	add_column :listings, :long_description, :string
  end
end
