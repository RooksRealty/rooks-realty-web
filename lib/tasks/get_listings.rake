require "net/http"
require 'fileutils'

namespace :import do

  desc 'Import listings from @ Homes Huntsville'
  task listings: :environment do
    doc = Nokogiri::HTML(open("http://athomeshuntsville.com/homesforsale/index.php?LO_CODE=ROOKS+REALTY,+INC&action=searchresults"))

	doc.xpath("//body//div[@class='container']//div[@class='container']//div[@class='row']//div[@class='span8']").each do |list|
		idx = 0;
		if list.children[3]
			listing = list.children[3].children[1].children[1].children[3].children[1]
			details1 = list.children[7].children[1].children[1]
			details2 = list.children[7].children[3].children[1]
			realtor = list.children[11].children[3].children[1].children[1].text.partition(':').last.partition(' -').first
			
			if listing.children[0] && listing.children[2] && listing.children[4]
				address = listing.children[0].text
				mls = listing.children[2].text.partition(': ').last.to_i
				price = listing.children[4].text.partition('$').last.delete(',').to_i

				puts "Address: #{address}"
				puts "MLS: #{mls}"
				puts "Price: #{price}"
			end

			street = details1.children[7].text.strip.partition(':').last
			city = details1.children[9].text.strip.partition(':').last
			zip_code = details1.children[11].text.strip.partition(':').last
			acres = details1.children[15].text.strip.partition(':').last

			bedrooms = details2.children[5].text.strip.partition(':').last
			bathrooms = details2.children[7].text.strip.partition(':').last
			garages = details2.children[9].text.strip.partition(':').last
			sqft = details2.children[11].text.strip.partition(':').last
			
			puts "Street: #{street}"
			puts "City: #{city}"
			puts "Zip Code: #{zip_code}"
			puts "Acres: #{acres}"
			puts "Bedrooms: #{bedrooms}"
			puts "Bathrooms: #{bathrooms}"
			puts "Garages: #{garages}"
			puts "SQFT: #{sqft}"
			puts "Realtor: #{realtor}"
			puts "---------------------------------"

			current_realtor = Realtor.find_by_name(realtor)
			current_realtor = Realtor.create!(:name => realtor) if current_realtor.nil?
			idx = idx + 1

			url = URI.parse("http://huntsvillelandproperty.com/lots-for-sale/photos/#{mls}/#{mls}-1.jpg")
			req = Net::HTTP.new(url.host, url.port)
			res = req.request_head(url.path)
			url = res.code == '200' ? "http://huntsvillelandproperty.com/lots-for-sale/photos/#{mls}/#{mls}-1.jpg" : nil
			# FileUtils.copy('app/assets/images/no_image_available.gif', "#{mls}-1.jpg")
			# url = "#{mls}-1.jpg" if url.nil? 	

			if Listing.find_by_mls(mls).nil?
				new_listing = Listing.create(:address => address, :city => city, :zipcode => zip_code, 
					:acres => acres, :bathrooms => bathrooms, :bedrooms => bedrooms, :garages => garages,
					:mls => mls, :price => price, :sqft => sqft, :realtor_id => current_realtor.id,
					:avatar => url)
			end
		end
	end
  end
end
