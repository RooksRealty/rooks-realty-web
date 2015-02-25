class UpdateRealtorTable < ActiveRecord::Migration
  def change
  	add_column :realtors, :phone_number, :string
  	add_column :realtors, :email, :string
  	add_attachment :realtors, :avatar
  end
end
