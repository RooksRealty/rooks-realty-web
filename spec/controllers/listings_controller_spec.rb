require 'spec_helper'

describe ListingsController do

  let(:realtor) { FactoryGirl.create(:realtor, :name => 'Original') }
  let!(:listing1) { FactoryGirl.create(:listing, :realtor => realtor) }
  let!(:listing2) { FactoryGirl.create(:listing) }
  let(:token) { FactoryGirl.create(:api_key) }
  let(:auth_headers) {
    {'HTTP_AUTHORIZATION' => "Token token=#{token.access_token}",
     'HTTP_ACCEPT' => 'application/json, text/plain, */*'}
  }

  context 'with token' do
    before(:each) {
      controller.stub(:restrict_access) { true }
    }

    describe '#index' do

      it 'responds successfully with an HTTP 200 status code' do
        get :index, :format => :json
        response.status.should eq(200)
      end

      it 'should get all listings' do
        get :index, :format => :json
        expect(assigns(:listings)).to match_array([listing1, listing2])
      end
    end

    describe '#show' do
      before do
        get :show, :id => listing1.id, :format => :json
      end

      it 'should respond successfully with an HTTP 200 status code' do
        response.status.should eq(200)
      end

      it 'should get details for listing given id' do
        expect(assigns(:listing)) == listing1
      end
    end

    describe '#new' do
      it 'should create new listing' do
        get :new, :format => :json
        expect(assigns(:listing)).not_to be_nil
      end
    end

    describe '#create' do
      let(:realtor) { FactoryGirl.create(:realtor) }
      let(:listing_params) {
        { :address => '555 Melrose Street', :city => 'Harvest', :mls => '12345', :realtor => realtor }
      }

      before do
        post :create, :listing => listing_params, :format => :json
      end

      it 'should create a new listing with given params' do
        actual_listing = assigns(:listing)
        expect(actual_listing.address) == listing_params[:address]
        expect(actual_listing.city) == listing_params[:city]
        expect(actual_listing.mls) == listing_params[:mls]
      end

      it 'should create a new listing that has a realtor' do
        Realtor.find(realtor.id).listings.first == assigns(:listing)
      end

      it 'should respond successfully with an HTTP 201 status code' do
        response.status.should be(201)
      end
    end

    # describe '#update' do
    #   let(:new_realtor) { FactoryGirl.create(:realtor, :name => 'New Realtor') }
    #   let(:listing_params) {
    #     { :city => 'New City', :id => listing1.id, :realtor => realtor }
    #   }
    #
    #   before do
    #     put :update, :listing => listing_params, :format => :json
    #   end
    #
    #   it 'should update listing' do
    #     expect(assigns(:listing).address).should not_eq listing1.address
    #     expect(assigns(:listing).address) == listing_params[:address]
    #   end
    #
    #   it 'should update listing that has a new realtor' do
    #     Realtor.find(new_realtor.id).listings.first == assigns(:listing)
    #     Realtor.find(realtor.id).listings.count == 0
    #     expect(assigns(:listing).realtor) == new_realtor
    #   end
    #
    #   it 'should respond with a 200 status code' do
    #     response.status.should be(200)
    #   end
    # end

    describe '#destroy' do
      before do
        delete :destroy, :id => listing1.id, :format => :json
      end

      it 'should delete listing' do
        Listing.count == 1
      end

      it 'should respond with a 204 status code' do
        response.status.should be(204)
      end
    end
  end

  context 'with no token' do
    it 'should respond with an HTTP 401 status code' do
      get :index, :format => :json
      response.status.should eq(401)
    end
  end

end