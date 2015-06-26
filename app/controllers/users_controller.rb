class UsersController < ApplicationController
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
            @layoutType="listview".to_json
            @extraClass="show_view".to_json
        end
    end

    private
    def user_params
        params.require(:user).permit!
    end
end
