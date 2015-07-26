class AuthenticationsController < ApplicationController
    def create
        omniauth = request.env['omniauth.auth']
        authentication = Authentication.find_by_provider_and_uid(omniauth['provider'], omniauth['uid'])
     
        if authentication
          # User is already registered with application
          #flash[:info] = 'Signed in successfully.'
          sign_in_and_redirect(authentication.user)
        elsif current_user
          # User is signed in but has not already authenticated with this social network
          current_user.authentications.create!(:provider => omniauth['provider'], :uid => omniauth['uid'])
          current_user.apply_omniauth(omniauth)
          current_user.save
     
          #flash[:info] = 'Authentication successful.'
          redirect_to listings_path
        else
          # User is new to this application
          user = User.new
          user.apply_omniauth(omniauth)
     
          if user.save(:validate => false)
            #binding.pry
            user.authentications.create(:provider => omniauth['provider'], :uid => omniauth['uid'])
            #flash[:info] = 'User created and signed in successfully.'
            sign_in_and_redirect(user)
          else
            #binding.pry
            flash[:notice]="There was some issue signing you through facebook please try creating an account"
            redirect_to signup_path
          end
        end
    end
     
    def destroy
        @authentication = current_user.authentications.find(params[:id])
        @authentication.destroy
        #flash[:notice] = 'Successfully destroyed authentication.'
        redirect_to authentications_url
    end
     
    private
    def sign_in_and_redirect(user)
        unless current_user
            user_session = UserSession.new(User.find_by_perishable_token(user.perishable_token))
            user_session.save
        end
        # if (session[:return_to])
        #   redirect_to session[:return_to]
        # else
          redirect_to listings_path
        # end
    end
end
