require 'spec_helper'

describe UsersController do

  describe 'authenticated user' do
    let!(:logged_in_user) { FactoryGirl.create(:user) }
    let!(:user1) { FactoryGirl.create(:user) }
    let!(:user2) { FactoryGirl.create(:user) }
    let(:token) { FactoryGirl.create(:api_key) }
    let(:auth_headers) {
      {'HTTP_AUTHORIZATION' => "Token token=#{token.access_token}",
       'HTTP_ACCEPT' => 'application/json, text/plain, */*'}
    }

    context 'with token' do
      before(:each) {
        controller.stub(:restrict_access) { true }
        allow(request.env['warden']).to receive(:authenticate!).and_return(logged_in_user)
      }

      describe '#index' do

        it 'responds successfully with an HTTP 200 status code' do
          get :index, :format => :json
          response.status.should eq(200)
        end

        it 'should get all users' do
          get :index, :format => :json
          expect(assigns(:users)).to match_array([logged_in_user, user1, user2])
        end
      end

      describe '#create' do
        let(:user_params) {
          {:email => 'email@test.com'}
        }

        before do
          post :create, :user => user_params, :format => :json
        end

        it 'should create a new realtor with given params' do
          expect(assigns(:user).email) == user_params[:email]
        end

        it 'should respond successfully with an HTTP 200 status code' do
          response.status.should be(200)
        end
      end

      # describe '#update' do
      #   let(:user_params) {
      #     {:email => 'new-email@test.com'}
      #   }
      #
      #   before do
      #     put :update, :user => user_params, :format => :json
      #   end
      #
      #   it 'should update listing' do
      #     expect(assigns(:user).email).should not_eq user1.email
      #     expect(assigns(:user).email) == user_params[:email]
      #   end
      #
      #   it 'should respond with a 200 status code' do
      #     response.status.should be(200)
      #   end
      # end

      describe '#destroy' do
        before do
          delete :destroy, :id => user1.id, :format => :json
        end

        it 'should delete user' do
          Listing.count == 1
        end

        it 'should respond with a 204 status code' do
          response.status.should be(204)
        end
      end
    end

    # context 'with no token' do
    #   it 'should respond with an HTTP 401 status code' do
    #     get :index
    #     response.status.should eq(401)
    #   end
    # end
  end

  # describe 'non-authenticated user' do
  #   it 'should respond with an HTTP  status code' do
  #     get :index
  #     response.status.should eq(500)
  #   end
  # end

end