class User < ActiveRecord::Base
    acts_as_authentic do |c|
        # c.login_field = 'username'
        c.validates_length_of_password_field_options = {:on => :create, :minimum => 4}
        c.validates_length_of_password_confirmation_field_options = {:on => :create, :minimum => 4}
    end
    validates_presence_of :gender
    validates_presence_of :love_for_pets
    validates_length_of :phone_no, :maximum => 11
    validates_numericality_of :phone_no,allow_blank: true

    #validates_presence_of :gender,:love_for_pets
    include UuidHelper
    has_many :listings,:dependent => :destroy
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

    def deliver_password_reset_instructions!
      reset_perishable_token!
      Notifier.password_reset_instructions(self).deliver
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

    def self.find_by_username_or_email(login)
      find_by_username(login) || find_by_email(login)
    end
end

