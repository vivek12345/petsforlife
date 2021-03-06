class Notifier < ActionMailer::Base
  default from: "no-reply@petzoned.com"

  def activation_instructions(user)
    subject  =     "Activation Instructions"
     # Removed name/brackets around 'from' to resolve "555 5.5.2 Syntax error." as of Rails 2.3.3
    email   =user.email
    sent_on =       Time.now
     @account_activation_url = activation_url(user.perishable_token)
     mail(:to=>email,:subject=>subject)
  end

  def welcome(user)
    subject   =    "Welcome to the site!"
  
    email   = user.email
    sent_on   =    Time.now
    @root_url = :login
    mail(:to=>email,:subject=>subject)
  end

  def password_reset_instructions(user)
    subject   =   "Password Reset Instructions"
    from      =  "noreplay@petzoned.com"
    email =  user.email
    content_type = "text/html"
    sent_on    =  Time.now
    @edit_password_reset_url = edit_password_reset_url(user.perishable_token)
    mail(:to=>email,:subject=>subject)
  end
end
