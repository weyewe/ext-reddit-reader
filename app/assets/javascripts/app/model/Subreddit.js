Ext.define('AM.model.Subreddit', {
    extend: 'Ext.data.Model',
    // requires: ['AM.model.Post' ],
 
    fields: [
        { name: "id" },
        { name: "name", type: "string" },
				{ name: "last_viewed_post_name", type: "string" }
    ],
 

		idProperty: 'id' ,proxy: {
			url: 'api/sub_reddits',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'sub_reddits',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { sub_reddit : record.data };
				}
			}
		}
		

    // proxy: {
    //     type: 'localstorage',
    //     id  : 'sub_reddits-collection'
    // } 

		// hasMany: {
		// 	model: "AM.model.Post",
		// 	name : 'posts',
		// 	filterProperty: 'query',
		// 	store: {
		// 		pageSize       : 50,
		// 		remoteFilter   : true,
		// 		clearOnPageLoad: false
		// 	}
		// }

});