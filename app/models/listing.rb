class Listing < ActiveRecord::Base
	#has_attachments :photos, maximum: 10
	has_many :photos
end
