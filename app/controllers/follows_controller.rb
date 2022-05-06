class FollowsController < ApplicationController

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
        render json: follow, status: :created, serializer: FollowWithFolloweeSerializer
    end

    # DELETE /follows/:id
    def destroy
        
        follow = Follow.find_by(followee_id: params[:id], follower_id: @current_user.id)
        follow.destroy
        
        head :no_content
    end


    private

    def follow_params
        params.permit(:follower_id, :followee_id)
    end

end
