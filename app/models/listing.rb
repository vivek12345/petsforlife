class Listing < ActiveRecord::Base
	has_attachments :photos, maximum: 1

end
