class RenameColumnPetId < ActiveRecord::Migration
  def change
  	rename_column :breeds,:pet_id,:pet_name
  	change_column :breeds,:pet_name,:string
  end
end
