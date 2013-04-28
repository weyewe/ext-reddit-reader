Ext.define('AM.controller.Subreddits', {
  extend: 'Ext.app.Controller',

  stores: ['Subreddits', 'Posts'],
  models: ['Subreddit', 'Post'],

  views: [
    'subreddit.Form',
    'SubRedditGrid' 
  ],

  	refs: [
			{
				ref: 'list',
				selector: 'subredditgrid'
			},
			{
				ref : 'viewport',
				selector : 'vp'
			}
	],

  init: function() {
    this.control({
      'subredditgrid': {
        selectionchange: this.selectionChange,
				afterrender : this.loadObjectList
      },
      'subredditform button[action=save]': {
        click: this.updateObject
      },
      'subredditgrid button[action=addObject]': {
        click: this.addObject
      },
     
      'subredditgrid button[action=deleteObject]': {
        click: this.deleteObject
      } 
		
    });
  },

	 

	loadObjectList : function(me){
		var me = this; 
		me.getSubredditsStore().load();
		// 
		// var theStore=  me.getSubredditsStore();
		// if( theStore ){
		// 	console.log("The store exists");
		// 	// theStore.load();
		// 	console.log(theStore);
		// }else{
		// 	console.log("The store is non-existant");
		// }
	},

  addObject: function() {
    var view = Ext.widget('subredditform');
    view.show();
  },

  editObject: function() {
		var me = this; 
    var record = this.getList().getSelectedObject();
    var view = Ext.widget('subredditform');

		

    view.down('form').loadRecord(record);
  },

  updateObject: function(button) {
		var me = this; 
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getSubredditsStore();
    var record = form.getRecord();
    var values = form.getValues();

		
		if( record ){
			record.set( values );
			 
			form.setLoading(true);
			record.save({
				success : function(record){
					form.setLoading(false);
					//  since the grid is backed by store, if store changes, it will be updated
					
					// store.getProxy().extraParams = {
					//     livesearch: ''
					// };
	 
					store.load();
					win.close();
				},
				failure : function(record,op ){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
				
			 
		}else{
			//  no record at all  => gonna create the new one 
			var me  = this; 
			var newObject = new AM.model.Subreddit( values ) ;
			
			// learnt from here
			// http://www.sencha.com/forum/showthread.php?137580-ExtJS-4-Sync-and-success-failure-processing
			// form.mask("Loading....."); 
			form.setLoading(true);
			newObject.save({
				success: function(record){
	
					store.load();
					form.setLoading(false);
					win.close();
					
				},
				failure: function( record, op){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
		} 
  },

  deleteObject: function() {
    var record = this.getList().getSelectedObject();

    if (record) {
      var store = this.getSubredditsStore();
      store.remove(record);
      store.sync();
// to do refresh programmatically
			this.getList().query('pagingtoolbar')[0].doRefresh();
    }

  },

  selectionChange: function(selectionModel, selections) {
		var me = this; 
    var grid = this.getList();

		var record = this.getList().getSelectedObject();
		
		if(!record ){ return;  }

    if (selections.length > 0) {
      grid.enableRecordButtons();
    } else {
      grid.disableRecordButtons();
    }

		if(!record.get("name") || record.get("name").length == 0){ return; }



		
		
		// before=t3_1bjgsv
		
		// me.getViewport().setLoading( true ) ;
		me.getPostsStore().populateStore('', me.getViewport() , record   ); 
		
		
		 

  }

});
