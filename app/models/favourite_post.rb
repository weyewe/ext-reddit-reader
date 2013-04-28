class FavouritePost < ActiveRecord::Base
  belongs_to :sub_reddit
  
  
  def self.create_object( parent , params) 
  end
  
  def update_object
  end
  
  def delete_object
  end
	
end
