class ListingsController < ApplicationController
	before_filter :store_return_to
	before_filter :require_user,except: [:index,:show,:search]
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
      	else
      		respond_to do |format|
				format.json { render :json =>  @listing.errors, :status => :unprocessable_entity }	
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
		@listing=Listing.find_by_uuid(params[:id])
		if @listing.user_id!=current_user.id
			redirect_to listings_path
		end
	end

	def update
		@listing=Listing.find_by_uuid(params[:id])
		if @listing.update_attributes(listing_params)
			if @listing.price>0
				@listing.update_attribute(:for_foster,'0')
			end
			redirect_to @listing
		else
			render 'edit'
		end
	end

	def show
		@listing=Listing.find_by_uuid(params[:id])
	end

	def index
		
		@listings=Listing.paginate(:page => params[:page], :per_page => 12)
		if current_user
			@user_listing=current_user.listings.map{|x| x}
		end
		@layoutType="grid".to_json
        @extraClass="index_view".to_json
	end

	def destroy
		@listing=Listing.find_by_uuid(params[:listing_id])
		if @listing.destroy
			render json: {
				:listings => Listing.paginate(:page => params[:page], :per_page => 12).to_json(:include => :photos),
				:user_listing => current_user.listings.map{|x| x}.to_json(:include => :photos)
			}
		end
	end

	def search
		@listings=Listing.where("breed_type = ?",params[:query])
	end

	private
	def listing_params
		params.require(:listing).permit!
	end

end
