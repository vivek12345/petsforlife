class Photo < ActiveRecord::Base
	mount_uploader :file_name, PhotoUploader
	belongs_to :listing
end
