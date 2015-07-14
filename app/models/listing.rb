class Listing < ActiveRecord::Base
	#has_attachments :photos, maximum: 10
	has_many :photos
    belongs_to :user
    belongs_to :favourite,:dependent => :destroy
    validates_presence_of :title,:pet_type,:love_for_pets,:gender,:price
end
