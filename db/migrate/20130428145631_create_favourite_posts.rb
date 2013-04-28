class CreateFavouritePosts < ActiveRecord::Migration
  def change
    create_table :favourite_posts do |t|
      

      t.timestamps
    end
  end
end
