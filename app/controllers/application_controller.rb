class ApplicationController < ActionController::API
    include Pagination
    # include Pagy::Backend

    include ActionController::Cookies
    
  end