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
            flash[:positive]="Successfully Logged In"
            redirect_to listings_path
        else
            render 'new'
        end
    end

    def destroy
        @user_session=UserSession.find
        @user_session.destroy

        respond_to do |format|
            format.html { redirect_to(root_url) }
        end
    end

    private

    def params_user_session
        params.require(:user_session).permit!
    end
end
