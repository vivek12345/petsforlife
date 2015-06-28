class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  

  private
  
  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end
  
  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.record
  end

  def require_user
    unless current_user    
        flash[:info] = "You must be logged in to access the page"
        redirect_to :login
        return false
    end
  end
  def require_no_user
    if current_user
      #store_location
      redirect_to root_url
      return false
    end
  end

  def store_return_to
    session[:return_to] = request.url
  end
end
