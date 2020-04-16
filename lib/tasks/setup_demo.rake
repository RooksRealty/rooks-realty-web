namespace :setup  do
	
	desc 'Setup an admin user and api key'
	task demo: :environment do
		User.create(:email => 'jkazembe@twc.com', :password => 'password')
		Info.create()
		api_key = ApiKey.create(:access_token => 'b9dee854a6f62cd3589c0c76569d2883')

		puts api_key.access_token
	end
end