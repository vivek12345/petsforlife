class Favourite < ActiveRecord::Base
    belongs_to :user
    has_many :listings
end
