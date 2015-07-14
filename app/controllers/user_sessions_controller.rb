class UserSessionsController < ApplicationController

    def new
        @user_session = UserSession.new
        respond_to do |format|
            format.html # new.html.erb
        end
    end

    def create
        @user_session=UserSession.create(params_user_session)
        if @user_session.save
            #flash[:positive]="Successfully Logged In"
            if (session[:return_to])
                redirect_to session[:return_to]
            else
               redirect_to listings_path
            end 
        else
            render 'new'
        end
    end

    def destroy
        @user_session=UserSession.find
        @user_session.destroy

        respond_to do |format|
            format.html { 
                session[:return_to]=listings_path
                redirect_to(login_path)
                flash[:info]="Logged Out"
            }
        end
    end

    private

    def params_user_session
        params.require(:user_session).permit!
    end
end
