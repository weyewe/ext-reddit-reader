class FavouritePost < ActiveRecord::Base
  # attr_accessible :title, :body
  #   {name: "created",              type: "string"},
  # 
  # {name: "permalink",     type: "string"},
  # {name: "thumbnail",     type: 'string'},
  # {name: 'author',        type: 'string' },
  #                       
  # {name: "url",           type: "string"}, 
  # {name: "title",         type: "string"},
  # {name: "name",          type: "string"},
  # {name: "domain",        type: "string"},
  # {name: "is_normal_image_link",  type: 'boolean', defaultValue: true  } ,
  # 
  # { name: 'parsed_images', type: 'auto' }
	
	t.string :thumbnail
	t.string :permalink
	t.string :author
	t.string :url
	t.string :title 
	t.string :name  
	t.string :domain 
	
end
