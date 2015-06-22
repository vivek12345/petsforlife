class ListingsController < ApplicationController
	before_filter :require_user,except: [:index]
	def new
		@breeds=Breed.all
		@listing=current_user.listings.new
	end

	def create
		@listing=current_user.listings.new(listing_params)
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

	def edit
		@listing=Listing.find(params[:id])
	end

	def show
		@listing=Listing.find(params[:id])
	end

	def index
		@listings=Listing.all
		if current_user
			if !current_user.favourites[0].nil?
				@favourite=Listing.includes(:photos).where(id:current_user.favourites.map {|x| x.listing_id})
			#@favourite=Listing.find(current_user.favourites[0].listing_id)
			end
		#binding.pry
			@user_listing=current_user.listings.map{|x| x}
		end
	end

	def favourite
		@favourite=Favourite.new(listing_id:params[:listing_id],user_id:current_user.id)
		if @favourite.save
			render json: Listing.includes(:photos).where(id:current_user.favourites.map {|x| x.listing_id})
			#render json: Listing.find(current_user.favourites[0].listing_id)
		end
	end

	def removeFavourite
		@favourite=Favourite.find_by_listing_id(params[:listing_id])
		@favourite.destroy
		if !current_user.favourites[0].nil?
			render json: Listing.includes(:photos).where(id:current_user.favourites.map {|x| x.listing_id})
		else
			render json: []
		end	
	end

	private
	def listing_params
		params.require(:listing).permit!
	end

end
