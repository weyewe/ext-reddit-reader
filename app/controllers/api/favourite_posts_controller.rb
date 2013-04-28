class Api::FavouritePostsController < Api::BaseApiController
  
  def index
    @parent = SubReddit.find_by_id params[:sub_reddit_id]
    @objects = @parent.active_favourite_posts.joins(  :sub_reddit).page(params[:page]).per(params[:limit]).order("id DESC")
    @total = @parent.active_favourite_posts.count
  end

  def create
    @object = FavouritePost.create_object(     params[:favourite_post] )  
    
    if @object.errors.size == 0 
      render :json => { 
                        :success => true, 
                        :favourite_posts => [@object] 
                      }  
    else
      msg = {
        :success => false, 
        :message => {
          :errors => extjs_error_format( @object.errors )  
        }
      }
      
      render :json => msg                         
    end
  end

  def update
    
    @object = FavouritePost.find_by_id params[:id] 
    @parent = @object.sub_reddit 
    @object.update_object( params[:favourite_post])
     
    if @object.errors.size == 0 
      render :json => { :success => true,   
                        :favourite_posts => [@object],
                        :total => @parent.active_favourite_posts.count  } 
    else
      msg = {
        :success => false, 
        :message => {
          :errors => extjs_error_format( @object.errors )  
        }
      }
      
      render :json => msg 
    end
  end

  def destroy
    @object = FavouritePost.find(params[:id])
    @parent = @object.sub_reddit 
    @object.delete_object

    if ( @object.persisted? and @object.is_deleted ) or ( not @object.persisted? )
      render :json => { :success => true, :total => @parent.active_favourite_posts.count }  
    else
      render :json => { :success => false, :total =>@parent.active_favourite_posts.count }  
    end
  end
  
  def search
    search_params = params[:query]
    selected_id = params[:selected_id]
    if params[:selected_id].nil?  or params[:selected_id].length == 0 
      selected_id = nil
    end
    
    customer_id = params[:customer_id]
    
    query = "%#{search_params}%"
    # on PostGre SQL, it is ignoring lower case or upper case 
    
    if  selected_id.nil?
      @objects = FavouritePost.joins(:item, :sub_reddit ).where{ (item.name =~ query )   & 
                                (is_deleted.eq false )  & 
                                (sub_reddit.customer_id.eq customer_id)
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
    else
      @objects = FavouritePost.joins(:item, :sub_reddit).where{ (id.eq selected_id)  & 
                                (is_deleted.eq false ) & 
                                (sub_reddit.customer_id.eq customer_id)
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
    end
    
    @total = @objects.count
    @success = true 
    # render :json => { :records => @objects , :total => @objects.count, :success => true }
  end
end
