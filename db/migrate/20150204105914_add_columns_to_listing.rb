class AddColumnsToListing < ActiveRecord::Migration
  def change
  	add_column :listings, :acres, :float
  	add_column :listings, :bedrooms, :integer
  	add_column :listings, :bathrooms, :integer
  	add_column :listings, :garages, :integer
  	add_column :listings, :sqft, :integer
  	add_column :listings, :realtor_id, :integer
  end
end
