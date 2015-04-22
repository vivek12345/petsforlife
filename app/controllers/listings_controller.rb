class ListingsController < ApplicationController
	def new
		@breeds=Breed.all
		@listing=Listing.new
	end

	def create
		@listing=Listing.new(listing_params)
		if @listing.save
			session[:listing]=@listing.id
			respond_to do |format|
				format.js
      		end
      		
		end
	end
	def media
		@listing=Listing.find(session[:listing])
		puts params
		@photo=Photo.new(file_name:params[:file],listing:@listing)
		if @photo.save!
			respond_to do |format|
				format.json{render :json=>@photo}

			end
		end

	end


	private
	def listing_params
		params.require(:listing).permit!
	end

end
