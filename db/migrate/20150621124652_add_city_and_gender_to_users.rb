class AddCityAndGenderToUsers < ActiveRecord::Migration
  def change
    add_column :users, :city, :string
    add_column :users, :gender, :string
    add_column :users, :love_for_pets, :text
  end
end
