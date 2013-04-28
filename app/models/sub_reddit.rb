class SubReddit < ActiveRecord::Base
  attr_accessible :name, :last_viewed_post_name
  validates_presence_of :name 
  validates_uniqueness_of :name 
  
  has_many :favourite_posts 
  
  def self.active_objects
    self.where(:is_deleted => false ).order("id DESC")
  end
  
  def active_favourite_posts
    self.favourite_posts 
  end
  
  def self.create_object( params ) 
    new_object = self.new
    new_object.name = params[:name]
    new_object.last_viewed_post_name = params[:last_viewed_post_name]
    
    new_object.save 
    
    return new_object 
  end
  
  def update_object( params ) 
    self.last_viewed_post_name = params[:last_viewed_post_name]
    self.save 

    return self
  end
  
  def delete_object
    
    if self.favourite_posts.count != 0 
      self.is_deleted = true 
      self.save
    else
      self.destroy 
    end
    
  end
end
