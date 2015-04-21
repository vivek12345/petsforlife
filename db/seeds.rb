# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
breeds=[
["Afghan Hound","1"],
["American FoxHound","1"],
["Australian Shephard","1"],
["First Breed","2"],
["Second Breed","2"]

]
breeds.each do |name,pet_id|
	Breed.create(name:name,pet_id:pet_id)
end


