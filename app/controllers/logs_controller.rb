class LogsController < ApplicationController
    before_action :find_log, only: [:update, :destroy, :show]

    skip_before_action :authorize, only: [:destroy]

    # GET /logs
    def index
        # PAGINATION
        render json: Log.limit(per_page).offset(paginate_offset)
        # debugger
        # render json: Log.all.reverse

    end

    #GET /logs/:id
    def show
        render json: @log
    end

    # UPDATE /logs/:id
    def update
        @log.update!(log_params)
        render json: @log, status: :created
    end

    # POST /logs
    def create
        log = Log.create!(log_params)
        render json: log, status: :created
    end

    # DELETE /logs/:id
    def destroy
        @log.destroy
        head :no_content
    end


    private

    def log_params
        params.permit(
            :notes,
            :depth,
            :bottom_time,
            :bottom_temp,
            :suit_thickness,
            :weight,
            :time_in,
            :time_out,
            :boat,
            :fresh,
            :date,
            :divemaster, 
            :dive_budy,
            :signature, 
            :user_id,
            :site_id
        )
    end

    def find_log
        @log = Log.find(params[:id])
    end

end
