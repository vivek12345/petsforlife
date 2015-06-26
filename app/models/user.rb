class User < ActiveRecord::Base
    acts_as_authentic do |c|
        c.login_field = 'username'
        c.validates_length_of_password_field_options = {:on => :update, :minimum => 4}
        c.validates_length_of_password_confirmation_field_options = {:on => :update, :minimum => 4}
    end

    #validates_presence_of :gender,:love_for_pets
    has_many :listings
    has_many :favourites
    has_many :authentications
    def activate!
        self.active = true
        save
    end

    def deliver_activation_instructions!
        reset_perishable_token!
        Notifier.activation_instructions(self).deliver
    end

    def deliver_welcome!
        reset_perishable_token!
        Notifier.welcome(self).deliver
    end

    def apply_omniauth(omniauth)  
      self.email = omniauth['info']['email']
      self.password=omniauth['credentials']['token']
      self.password_confirmation=omniauth['credentials']['token']
      self.username=omniauth['info']['name']
      self.gender=omniauth['extra']['raw_info']['gender']
      self.love_for_pets="love them"
      self.active=true
    end
end

