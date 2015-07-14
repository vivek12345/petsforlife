class AddAgeToListings < ActiveRecord::Migration
  def change
    add_column :listings, :age, :string
  end
end
