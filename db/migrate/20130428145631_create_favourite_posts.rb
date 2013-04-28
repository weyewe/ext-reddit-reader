class CreateFavouritePosts < ActiveRecord::Migration
  def change
    create_table :favourite_posts do |t|
      t.integer :sub_reddit_id 
      
      t.string :name 

      t.timestamps
    end
  end
end
