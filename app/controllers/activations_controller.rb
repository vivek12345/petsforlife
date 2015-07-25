class ActivationsController < ApplicationController
    before_filter :require_no_user
  def create
    @user = User.find_using_perishable_token(params_activation, 1.week)
     if @user
        if @user.activate!
          flash[:positive] = "Your account has been activated!"
          UserSession.create(@user, false) # Log user in manually
          @user.deliver_welcome!
          redirect_to @user
        else
          flash[:error]="Sorry something went wrong, please reload the page"
          redirect_to :login
        end
      else
       flash[:error]="Sorry but user with this activation code is not found"
       redirect_to :login
      end
  end

  private
  def params_activation
    params.require(:activation_code)
  end
end
