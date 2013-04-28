class Api::SubRedditsController < Api::BaseApiController
  
  def index
    @objects = SubReddit.active_objects.page(params[:page]).per(params[:limit]).order("id DESC")
    @total = SubReddit.active_objects.count
    render :json => { :sub_reddits => @objects , :total => @total , :success => true }
  end

  def create
    @object = SubReddit.create_object(  params[:sub_reddit] )  
    @total = SubReddit.active_objects.count
    
    
 
    if @object.errors.size == 0 
      render :json => { :success => true, 
                        :sub_reddits => [@object] , 
                        :total => @total  }  
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
    
    @object = SubReddit.find_by_id params[:id] 
    @object.update_object( params[:sub_reddit])
     
    if @object.errors.size == 0 
      render :json => { :success => true,   
                        :sub_reddits => [@object],
                        :total => SubReddit.active_objects.count  } 
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
    @object = SubReddit.find(params[:id])
    @object.delete_object

    if  ( @object.is_deleted)  or  (   not @object.persisted?)
      render :json => { :success => true, :total => SubReddit.active_objects.count }  
    else
      render :json => { 
                  :success => false, 
                  :total => SubReddit.active_objects.count,
                  :message => {
                    :errors => extjs_error_format( @object.errors )  
                  }
               }  
    end
  end
  
  
end
