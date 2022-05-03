class FollowsController < ApplicationController
    # skip_before_action :authorize, only: [:create, :show, :index, ]

    # GET /follows
    def index
        render json: Follow.all
    end

    # GET /follows/:id
    def show
        follow = Follow.find(params[:id])
        render json: follow
    end

    # GET /followees
    def followees
        render json: @current_user.followees
    end

    # POST /follows
    def create
        follow = Follow.create!(follow_params)
        render json: follow, status: :created
    end

    # DELETE /follows/:id
    def destroy

        # follow = Follow.find(params[:id])
        # follow.destroy
        # head :no_content


        # follow =  Follower.find_by(followee_id: params[:followee_id],
        # follower_id: [@current_user.id])
        # follow.destroy
        # head :no_content
        
        # session.merge!({})
        # current_user = User.find_by(id: session[:user_id])
        # current_user = User.first
        
        follow = Follow.find_by(followee_id: params[:id], follower_id: @current_user.id)
        follow.destroy
        
        head :no_content

        # follow = Follow.where(follower_id = [@current_user.id], followee_id = [:followee_id])
        # follow.destroy
        # head :no_content

        # @current_user.followees.find_by(followee_id: followee_id).destroy
        # head :no_content

    end

    # TEST NEW FOLLOW METHOD
    # def follow
    #     @user = User.find(params[:id])
    #     current_user.followees << @user
    #     redirect_back(fallback_location: user_path(@user))
    #   end

    #   def unfollow
    #     @user = User.find(params[:id])
    #     current_user.followed_users.find_by(followee_id: @user.id).destroy
    #     redirect_back(fallback_location: user_path(@user))
    #   end

    private

    def follow_params
        params.permit(:follower_id, :followee_id)
    end

end
