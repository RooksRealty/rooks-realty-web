class Realtor < ActiveRecord::Base
	has_attached_file :avatar, 
			:styles => { :medium => "300x300>", :thumb => "100x100>" }, 
			:default_url => "/assets/no_image_male.jpg"

	validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

	has_many :listings
end
