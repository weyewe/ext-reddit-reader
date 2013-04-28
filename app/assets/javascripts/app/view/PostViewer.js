/**
 * @class FeedViewer.FeedPost
 * @extends Ext.panel.Panel
 *
 * Shows the detail of a feed post
 *
 * @constructor
 * Create a new Feed Post
 * @param {Object} config The config object
 */
Ext.define('AM.view.PostViewer', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.postviewer',
    cls: 'preview',
    autoScroll: true,
    border: true,
    
    initComponent: function(){
        Ext.apply(this, {
            dockedItems: [this.createToolbar()],
            tpl: Ext.create('Ext.XTemplate',
                '<div class="post-data">',
                    '<h3 class="post-title">{title:this.defaultTitle}</h3>',
                '</div>',
								
                '<div class="post-body" style="text-align:center;">',
										'<tpl if="is_normal_image_link == true">',
											'<img style="width:80%;" src="{url:this.defaultUrl}" />',
										'</tpl>',
										
										'<tpl if="is_normal_image_link == false">',
											'{parsed_images:this.showParsedImages}',
										'</tpl>',
										
								'</div>',
                {
										showParsedImages: function(parsed_images){
											if( parsed_images.length ===  0){
												return "<b>NO IMAGES</b>";
											}else{
												
												// console.log("FINAL PARSED IMAGES");
												// console.log( parsed_images ) ;
												var images_string = '';
												for(var i = 0; i < parsed_images.length; i++){
													var imgUrl = parsed_images[i];
													// console.log("for i = " + i + " The image: " + imgUrl);
													
													var string = '<img style="width:60%;" src="' + imgUrl + '" />'  + " <br />";
													images_string = images_string + string;
												}
												return images_string; 
												// console.log("The extracted images: " + images_string);
												// return "<b>There is SOME IMAGES</b>";
											}
										},
	
										defaultTitle : function(title){
											return title? title : 'Select a post';
										},
										defaultUrl : function(url){
											return url? url : '';
										},
                    getBody: function(value, all){
                        return Ext.util.Format.stripScripts(value);
                    },

                    defaultValue: function(v){
                        return v ? v : 'Unknown';
                    },

                    formatDate: function(value){
                        if (!value) {
                            return '';
                        }
                        return Ext.Date.format(value, 'M j, Y, g:i a');
                    }


                }
             )
        });
        this.callParent(arguments);
    },

    /**
     * Set the active post
     * @param {Ext.data.Model} rec The record
     */
    setActive: function(rec) {
				if(rec.get('is_normal_image_link') === false ){
					var parsed_images = rec.get('parsed_images');
					// console.log("The parsed images");
					// console.log(parsed_images);
				}
	
				this.active = rec;
        this.update(rec.data);
    },

	 

    /**
     * Create the top toolbar
     * @private
     * @return {Ext.toolbar.Toolbar} toolbar
     */
    createToolbar: function(){
        var items = [],
            config = {};
        // if (!this.inTab) {
        //      items.push({
        //          scope: this,
        //          handler: this.openTab,
        //          text: 'View in new tab',
        //          iconCls: 'tab-new'
        //      }, '-');
        //  }
        //  else {
        //      config.cls = 'x-docked-noborder-top';
        //  }
        items.push(
					{
	            scope: this,
	            handler: this.goToPost,
	            text: 'Go to post',
	            iconCls: 'post-go'
	        },
					'->',
					{
	            scope: this,
	            handler: this.favObject,
	            text: 'Favourite' 
	        }

				);
        config.items = items;
        return Ext.create('widget.toolbar', config);
    },

    /**
     * Navigate to the active post in a new window
     * @private
     */
    goToPost: function(){
			if(!this.active){return;}
			
			window.open(this.active.get('url'));
    },

		favObject: function(){
			if(!this.active){
				console.log("wtf bro, no post selected");
				return;
			}else{
				console.log("yeah, favourite!");
			}
			
			// create a new record for favourited post 
			
			// set showloading. when it is finished, clear the showLoading
			
		},

    /**
     * Open the post in a new tab
     * @private
     */
    openTab: function(){
        this.fireEvent('opentab', this, this.active);
    }

});