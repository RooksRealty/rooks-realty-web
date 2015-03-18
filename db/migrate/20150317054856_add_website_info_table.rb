class AddWebsiteInfoTable < ActiveRecord::Migration
  def change
  	create_table :infos do |t|
      t.text :about_us
      t.string :address
      t.string :city
      t.string :state
      t.string :zip_code
      t.string :phone_number
      t.string :fax
      t.string :email

      t.timestamps
    end
  end
end
