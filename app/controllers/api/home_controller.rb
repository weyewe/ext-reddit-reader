require 'rubygems'
require 'nokogiri'
require 'open-uri'



class Api::HomeController < Api::BaseApiController

  respond_to :json
 
  def extract_images
    
    if params[:url].present?
      # regex =  /imgur.com\/a\// 
      
      
      begin
        page = Nokogiri::HTML(open( params[:url]  ))  
        
        if( page.css("#image-container").length == 0 )
          result = page.css("#image img")
          images = result.map {|x| x['src'] }
        else
          result = page.css("#image-container img")
          images = result.map {|x| x['data-src'] }
        end
        
        
        
        render :json=> {:success=>false, :images => images.to_json} 
      rescue
        render :json=> {:success=>false, :message=>"Your link is INVALID"} 
      end
    else
      render :json=> {:success=>false, :message=>"Your link is not present"} 
    end
    
    
  end
end


 

