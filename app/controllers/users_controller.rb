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
        @user=User.find_by_uuid(params[:id])
        if @user
            @listings=@user.listings.where(:is_active=>true)
            if request.user_agent =~ /Mobile|webOS/
                @layoutType="grid".to_json
            else
                @layoutType="listview".to_json
            end

            @extraClass="show_view".to_json
        end
    end

    def index
        @users = User.order('username').paginate(:page => params[:page], :per_page => 1)
    end


    def autocomplete
        render json: Breed.where("lower(name) LIKE ?", "%#{params[:query].downcase}%").map{|breed| {username:breed.name,value:breed.pet_name}}
    end

    def edit
        @user=current_user
        if(params[:id]!=@user.uuid)
            redirect_to listings_path
        end
    end

    def update
        @user=current_user
        if @user.update_attributes(user_params)
            flash[:teal]="Profile Edited"
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
