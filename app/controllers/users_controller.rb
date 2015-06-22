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

    private
    def user_params
        params.require(:user).permit!
    end
end
