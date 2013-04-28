Ext.define('AM.view.ProtectedContent', {
    extend: 'Ext.panel.Panel',
		alias : 'widget.protected',
    
    layout: 'border',
    
    items: [
        {
            region: 'north',
            xtype : 'appHeader'
        },
        
        {
            region: 'center',
            
            layout: {
                type : 'hbox',
                align: 'stretch'
            },
            
            items: [
							{
								xtype : 'subredditgrid',
								// region : 'west',
								flex : 1
							},
							{
								xtype : 'postviewer',
								// region : 'center',
								flex : 5 
							},
							{
								xtype : 'postgrid',
								// region : 'east',
								flex : 2
							}

							
            ]
        }
    ]
});
