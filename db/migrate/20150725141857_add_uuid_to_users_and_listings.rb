class AddUuidToUsersAndListings < ActiveRecord::Migration
  def change
    change_column :listings,:user_id,:string
    change_column :photos,:listing_id,:string
    add_column :listings, :uuid, :string, :limit => 36, :primary => true
    add_column :users, :uuid, :string, :limit => 36, :primary => true
  end
end
