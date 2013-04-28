class Picture < ActiveRecord::Base
  belongs_to :favourite_post 
  # attr_accessible :title, :body
end
