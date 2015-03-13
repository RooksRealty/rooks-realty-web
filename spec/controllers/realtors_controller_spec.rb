require 'spec_helper'

describe RealtorsController do

  let!(:realtor1) { FactoryGirl.create(:realtor, :name => 'Jane Doe') }
  let!(:realtor2) { FactoryGirl.create(:realtor) }
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

      it 'should get all realtors' do
        get :index, :format => :json
        expect(assigns(:realtors)).to match_array([realtor1, realtor2])
      end
    end

    describe '#show' do
      before do
        get :show, :id => realtor1.id, :format => :json
      end

      it 'should respond successfully with an HTTP 200 status code' do
        response.status.should eq(200)
      end

      it 'should get details for listing given id' do
        expect(assigns(:realtor)) == realtor1
      end
    end

    describe '#create' do
      let(:realtor_params) {
        { :name => 'John Doe', :email => 'email@test.com' }
      }

      before do
        post :create, :realtor => realtor_params, :format => :json
      end

      it 'should create a new realtor with given params' do
        actual_realtor = assigns(:realtor)
        expect(actual_realtor.name) == realtor_params[:name]
        expect(actual_realtor.email) == realtor_params[:email]
      end

      it 'should respond successfully with an HTTP 201 status code' do
        response.status.should be(201)
      end
    end

    # describe '#update' do
    #   let(:realtor_params) {
    #     { :name => 'Jane Smith' }
    #   }
    #
    #   before do
    #     put :update, :realtor => realtor_params, :format => :json
    #   end
    #
    #   it 'should update listing' do
    #     expect(assigns(:realtor).name).should not_eq realtor1.name
    #     expect(assigns(:realtor).name) == listing_params[:name]
    #   end
    #
    #   it 'should respond with a 200 status code' do
    #     response.status.should be(200)
    #   end
    # end

    describe '#destroy' do
      before do
        delete :destroy, :id => realtor1.id, :format => :json
      end

      it 'should delete realtor' do
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