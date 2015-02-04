class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.string :address
      t.string :city
      t.string :state
      t.string :zipcode
      t.integer :price
      t.integer :mls

      t.timestamps
    end
  end
end
