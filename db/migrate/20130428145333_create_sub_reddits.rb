class CreateSubReddits < ActiveRecord::Migration
  def change
    create_table :sub_reddits do |t|
      
      t.string :name 
      t.string :last_viewed_post_name # yeah, that's how reddit API works 
      
      t.boolean :is_deleted, :default => false 

      t.timestamps
    end
  end
end
