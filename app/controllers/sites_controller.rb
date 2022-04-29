class SitesController < ApplicationController

    skip_before_action :authorize, only: [:create, :index]

    # GET /sites
    def index
        render json: Site.all
    end

    # GET /last
    def last
        render json: Site.last
    end

    # POST /sites
    def create
        site = Site.create!(site_params)
        render json: site, status: :created
    end

    private 
    
    def site_params
        params.permit(:name, :location, :lat, :long)
    end

end
