class AddNameToFavouritePost < ActiveRecord::Migration
  def change
    add_column :favourite_posts, :name, :string 
  end
end
