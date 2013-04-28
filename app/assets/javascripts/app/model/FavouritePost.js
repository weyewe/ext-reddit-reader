Ext.define('AM.model.FavouritePost', {
    extend: 'Ext.data.Model',
    // requires: ['AM.model.Post' ],
 
    fields: [
        { name: "id",  type:'int'},
				{ name: "sub_reddit_id",  type:'int'},
        { name: "name", type: "string" } 
    ],
 

		idProperty: 'id' ,proxy: {
			url: 'api/favourite_posts',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'favourite_posts',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { favourite_post : record.data };
				}
			}
		}
		

    // proxy: {
    //     type: 'localstorage',
    //     id  : 'favourite_posts-collection'
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