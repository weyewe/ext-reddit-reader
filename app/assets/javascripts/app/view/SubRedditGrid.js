Ext.define('AM.view.SubRedditGrid' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.subredditgrid',

  	store: 'Subreddits', 
		title: 'Subreddit',
 

	initComponent: function() {
		this.columns = [
			{ header: 'Name', dataIndex: 'name', flex:  1} 
		];

		this.addObjectButton = new Ext.Button({
			text: 'Add',
			action: 'addObject'
		});
 
		this.deleteObjectButton = new Ext.Button({
			text: 'Delete',
			action: 'deleteObject',
			disabled: true
		});
		
 



		this.tbar = [this.addObjectButton, this.deleteObjectButton ];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.deleteObjectButton.enable();
	},

	disableRecordButtons: function() {
		this.deleteObjectButton.disable();
	}
});
