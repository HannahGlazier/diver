class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    
    # GET /users
    def index
        render json: User.all
    end

    # GET /users/:id
    def show
        render json: @current_user
        # user_id = User.find_by(id: session[:user_id])
        # render json: user_id, status: :ok
    end

    # POST /users
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end
    
    private
    
    def user_params
        params.permit(:name, :password, :password_confirmation, :certification_date, :certification_level, :homebase, :icon)
    end
    
end
