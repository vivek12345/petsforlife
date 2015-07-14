class Breed < ActiveRecord::Base
    searchkick autocomplete: ['name']
end
