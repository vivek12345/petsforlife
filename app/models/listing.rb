class Listing < ActiveRecord::Base
	#has_attachments :photos, maximum: 10
    include UuidHelper
	has_many :photos
    belongs_to :user
    # belongs_to :favourite,:dependent => :destroy
    validates_presence_of :title,:pet_type,:description
    validates_length_of :phone_no, :maximum => 11
    validates_numericality_of :phone_no,allow_blank: true
end
