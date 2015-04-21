class AddListingIdPhotos < ActiveRecord::Migration
  def change
  	add_column :photos,:listing_id,:integer
  	remove_column :photos,:user_id
  end
end
