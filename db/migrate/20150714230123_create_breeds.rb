class CreateBreeds < ActiveRecord::Migration
  def change
    drop_table :breeds
    create_table :breeds do |t|
      t.string :name
      t.string :pet_name
      t.timestamps
    end
  end
end
