Rails.application.routes.draw do

  root to: "static_pages#root"

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :destroy, :create]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :update]
    resources :topics, only: [:show, :create, :destroy, :index]
    resources :posts, only: [:show, :create, :destroy, :index]
  end

end
