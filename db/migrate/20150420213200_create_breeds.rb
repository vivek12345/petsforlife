class CreateBreeds < ActiveRecord::Migration
  def change
    create_table :breeds do |t|

      t.string :name
      t.integer :pet_id
      t.timestamps
    end
  end
end
