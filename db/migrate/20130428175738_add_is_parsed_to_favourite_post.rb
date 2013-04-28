class AddIsParsedToFavouritePost < ActiveRecord::Migration
  def change
    add_column :favourite_posts, :is_parsed, :boolean, :default => false 
  end
end
