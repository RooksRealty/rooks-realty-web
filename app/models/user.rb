class User < ActiveRecord::Base
	devise :database_authenticatable, :registerable, :lockable, :timeoutable,
         :recoverable, :rememberable, :trackable, :validatable

    after_create :send_reset_password_instructions
end
