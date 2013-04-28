class FavouritePost < ActiveRecord::Base
  belongs_to :sub_reddit
  has_many :pictures 
  validates_presence_of :sub_reddit_id, :name 
  validates_uniqueness_of :name 
  
  
  def self.create_object(  params) 
    new_object=  self.new
    new_object.name = params[:name]
    new_object.sub_reddit_id = params[:sub_reddit_id] 
    
    new_object.save
    
    return new_object 
  end
  
  def update_object( params) 
    self.name = params[:name]
    self.save
    
    return self
  end
  
  def delete_object
    self.pictures.each do |pic|
      pic.destroy
    end
    
    self.destroy 
  end
	
end
