class RentalsController < ApplicationController
  before_action :authorize

  def index
    render json: @current_user.rentals.all, include: [:movie]
  end

  def show
    find_rental
    render json: @rental, only: :id, include: [:user, :movie, :store, :days]
  end

  def create
    find_movie
    rental = @current_user.rentals.create!(user_id: @current_user.id, movie_id: @movie.id, store_id: @movie.store_id, days: params[:days])
    render json: rental, status: :created
  end

  def destroy
    find_rental
    @rental.destroy
    head :no_content
  end

  private

    def find_rental
      @rental = Rental.find_by(id: params[:id])
    end

    def rental_params
      params.permit(:user_id, :movie_id, :store_id, :days)
    end

    def find_movie
      @movie = Movie.find_by(id: params[:movie_id])
    end

end
