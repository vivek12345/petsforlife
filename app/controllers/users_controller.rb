class UsersController < ApplicationController
    before_filter :require_user,only: [:edit,:update,:destroy]
    def new
        @user_session=UserSession.new
        @user = User.new

        respond_to do |format|
            format.html # new.html.erb
            format.json { render json: @user }
        end
    end

    def create
        @user=User.create(user_params)
        if @user.save_without_session_maintenance
            @user.deliver_activation_instructions!
            flash[:info] = "Your account has been created. Please check your e-mail for your account activation instructions!"
            redirect_to :login
        else
            render :action => :new
        end
    end

    def show
        @user=User.find_by_id(params[:id])
        if @user
            @listings=@user.listings
            if request.user_agent =~ /Mobile|webOS/
                @layoutType="grid".to_json
            else
                @layoutType="listview".to_json
            end
            
            @extraClass="show_view".to_json
        end
    end

    def index
        @users=User.all
    end

    def destroy
        @listing=Listing.find(params[:id])
        if @listing.destroy
            redirect_to listings_path
        end
    end

    def autocomplete
        # @results=
        # render json: User.search(params[:query],autocomplete:true).map{|user| {username:user.username,value:user.id}}
        # render json: Breed.search(params[:query],autocomplete:true).map{|breed| {username:breed.name,value:breed.name}}
        
        render json: Breed.where("name LIKE ?", "#{params[:query].capitalize}%").map{|breed| {username:breed.name,value:breed.pet_name}}
        #binding.pry

        
            #     @results=(User.search(params[:query],autocomplete:true).map{|user| {username:user.username,value:user.id}})
            
            # render json: {
            #     results:@results
            # }
        
    end

    def edit
        @user=current_user
        if(params[:id].to_i!=@user.id)
            redirect_to listings_path
        end
    end

    def update
        @user=current_user
        if @user.update_attributes(user_params)
            flash[:positive]="Profile Edited"
            redirect_to current_user
        else
            render 'edit'
        end
    end

    private
    def user_params
        params.require(:user).permit!
    end
end
