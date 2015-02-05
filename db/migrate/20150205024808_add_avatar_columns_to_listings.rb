class AddAvatarColumnsToListings < ActiveRecord::Migration
  def change
  	add_attachment :listings, :avatar
  end
end
