class AddPriceToRentals < ActiveRecord::Migration[7.0]
  def change
    add_column :rentals, :price, :decimal, precision: 5, scale: 2
  end
end
