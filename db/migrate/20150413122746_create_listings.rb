class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.string :title
      t.string :pet_type
      t.string :breed_type
      t.decimal :price
      t.string :gender
      t.string :phone_no
      t.integer :no_of_pets
      t.string :color
      t.text :love_for_pets

      t.timestamps
    end
  end
end
