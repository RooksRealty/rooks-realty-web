class CreateRealtors < ActiveRecord::Migration
  def change
    create_table :realtors do |t|
      t.string :name
      t.timestamps
    end
  end
end
