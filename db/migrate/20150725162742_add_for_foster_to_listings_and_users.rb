class AddForFosterToListingsAndUsers < ActiveRecord::Migration
  def change
    add_column :listings, :for_foster, :integer,default:0
    add_column :users, :for_foster, :integer,default:0
  end
end
