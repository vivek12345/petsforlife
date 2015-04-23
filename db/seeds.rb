# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
breeds=[
["Afghan Hound","Dog"],
["American FoxHound","Dog"],
["Australian Shephard","Dog"],
["First Breed","Cat"],
["Second Breed","Cat"]

]
breeds.each do |name,pet_name|
	Breed.create(name:name,pet_name:pet_name)
end


