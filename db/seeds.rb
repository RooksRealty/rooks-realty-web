# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user1 = User.create :email => "admin@rooks-realty.com", :password => "admin123", :confirmed_at => Date.today

info = Info.create :about_us => "<strong>Let our experience make your home buying and selling successful!</strong>
		<p>
			Rooks Realty, Inc. is dedicated to helping people achieve their dream of home ownership. 
			We value and respect each client and will do everything possible to meet your needs.
		</p>", 
	:address => '1580 Sparkman Drive Northwest', :city => 'Huntsville', :state => 'AL', :zip_code => '35816', 
	:phone_number => '2568377722', :fax => '2568377723'
