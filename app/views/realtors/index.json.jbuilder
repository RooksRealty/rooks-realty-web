json.array!(@realtors) do |realtor|
  json.extract! realtor, :id, :name, :email, :phone_number, :avatar, :created_at
end