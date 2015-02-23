json.array!(@listings) do |listing|
  json.extract! listing, :id, :address, :city, :state, :zipcode, :price, :mls, :acres, :bedrooms, :bathrooms, :garages, :sqft, :avatar_file_name, :realtor, :avatar, :created_at
end
