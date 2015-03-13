class AddTypeAndBuildDateColumnsToListing < ActiveRecord::Migration
  def change
  	add_column :listings, :build_type, :string
  	add_column :listings, :year_built, :string
  end
end
