class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :token_authenticatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body
  
  def self.create_object( params) 
    new_object = self.new 
    new_object.email = params[:email]
    new_object.password = params[:password]
    new_object.password_confirmation = params[:password_confirmation]
    new_object.save 
    
    return new_object
  end
  
  def update_password(  params) 
    self.password = params[:password]
    self.password_confirmation = params[:password_confirmation]
    
    self.save 
    
    return self 
    
  end
  
  
  def set_as_main_user 
    admin_role = Role.find_by_name ROLE_NAME[:admin]
    self.role_id = admin_role.id 
    self.is_main_user = true 
    self.save 
  end
end
