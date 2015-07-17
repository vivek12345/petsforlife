class PasswordResetsController < ApplicationController
    before_filter :require_no_user
    before_filter :load_user_using_perishable_token, :only => [ :edit, :update ]

    def new
    end

    def create
        @user = User.find_by_email(params[:email])
        if @user
          @user.deliver_password_reset_instructions!
          flash[:info] = "Instructions to reset your password have been emailed to you"
          redirect_to login_path
        else
          flash.now[:error] = "No user was found with email address #{params[:email]}"
          render :action => :new
        end
    end

    def edit
    end

    def update
        @user.password = params[:user][:password]
        # Only if your are using password confirmation
        @user.password_confirmation = params[:user][:password_confirmation]

        # Use @user.save_without_session_maintenance instead if you
        # don't want the user to be signed in automatically.
        if @user.save_without_session_maintenance
          flash[:teal] = "Your password was successfully updated,please login with the new password"
          redirect_to login_path
        else
          render :action => :edit
        end
    end


    private

    def load_user_using_perishable_token
        @user = User.find_using_perishable_token(params[:id])
        unless @user
          flash[:error] = "We're sorry, but we could not locate your account"
          redirect_to login_path
        end
    end
end
