class AddForAdoptionToListings < ActiveRecord::Migration
  def change
    #this name was incorrectly given,this migration is to change the data typeof for_foster
    change_column :listings, :for_foster, :string
  end
end
