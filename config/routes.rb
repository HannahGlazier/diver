Rails.application.routes.draw do
  resources :logs
  resources :follows
  resources :sites
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # get "/last", to: "sites#last"

  # TEST NEW FOLLOW METHOD
  # post '/users/:id/follow', to: "users#follow", as: "follow_user"
  # post '/users/:id/unfollow', to: "users#unfollow", as: "unfollow_user"

  # get '*path',
  # to: 'fallback#index',
  # constraints: ->(req) { !req.xhr? && req.format.html? }
  
end
