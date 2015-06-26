class ListingsController < ApplicationController
	before_filter :require_user,except: [:index,:show]
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
		#@listings=Listing.joins("LEFT OUTER JOIN favourites on favourites.listing_id=listings.id")
		@listings=Listing.all
		#binding.pry
		if current_user
			if !current_user.favourites[0].nil?
				@favourite=Listing.where(id:current_user.favourites.map {|x| x.listing_id})
			#@favourite=Listing.find(current_user.favourites[0].listing_id)
			end
		#binding.pry
			@user_listing=current_user.listings.map{|x| x}
		end
		@layoutType="grid".to_json
        @extraClass="index_view".to_json
	end

	def favourite
		@favourite=Favourite.new(listing_id:params[:listing_id],user_id:current_user.id)
		if @favourite.save
			render json: Listing.where(id:current_user.favourites.map {|x| x.listing_id}).to_json(:include=>:photos)
			#render json: Listing.find(current_user.favourites[0].listing_id)
		end
	end

	def removeFavourite
		@favourite=Favourite.find_by_listing_id(params[:listing_id])
		@favourite.destroy
		if !current_user.favourites[0].nil?
			render json: Listing.where(id:current_user.favourites.map {|x| x.listing_id}).to_json(:include=>:photos)
		else
			render json: []
		end	
	end

	private
	def listing_params
		params.require(:listing).permit!
	end

end
