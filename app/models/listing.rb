class Listing < ActiveRecord::Base
	#has_attachments :photos, maximum: 10
	has_many :photos
    belongs_to :user
    belongs_to :favourite,:dependent => :destroy
end
