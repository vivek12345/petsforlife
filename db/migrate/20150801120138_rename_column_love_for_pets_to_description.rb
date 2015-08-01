class RenameColumnLoveForPetsToDescription < ActiveRecord::Migration
  def change
    rename_column :listings,:love_for_pets,:description
  end
end
