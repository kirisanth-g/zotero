Zotero.HelloWorldZotero = {
	DB: null,
	
	init: function () {
		// Connect to (and create, if necessary) helloworld.sqlite in the Zotero directory
		this.DB = new Zotero.DBConnection('fsroot');
		
		if (!this.DB.tableExists('changes')) {
			this.DB.query("CREATE TABLE changes (num INT)");
			this.DB.query("INSERT INTO changes VALUES (0)");
		}
		
		// Register the callback in Zotero as an item observer
		var notifierID = Zotero.Notifier.registerObserver(this.notifierCallback, ['item']);
		
		// Unregister callback when the window closes (important to avoid a memory leak)
		window.addEventListener('unload', function(e) {
				Zotero.Notifier.unregisterObserver(notifierID);
		}, false);
	},
	
	insertHello: function() {
		var data = {
			title: "Zotero",
			company: "Center for History and New Media",
			creators: [
				['Dan', 'Stillman', 'programmer'],
				['Simon', 'Kornblith', 'programmer']
			],
			version: '1.0.1',
			company: 'Center for History and New Media',
			place: 'Fairfax, VA',
			url: 'http://www.zotero.org'
		};
		Zotero.Items.add('computerProgram', data); // returns a Zotero.Item instance
	},
	myfunc: function() {
		window.openDialog('chrome://helloworldzotero/content/test_win.xul',
		'testWin','')
	},
	
	// Callback implementing the notify() method to pass to the Notifier
	notifierCallback: {
		// notify: function(event, type, ids, extraData) {
		// 	var search = new Zotero.Search();
		// 	var tagname = 'c01';
	 //        search.addCondition('tag', 'is', tagname);
	 //        var results = search.search();

	 //        var items = z.Items.get(results);

		// 	// Loop through array of items and grab titles
		// 	var titles = [];
		// 	for each(var item in items) {
		// 		// For deleted items, get title from passed data
		// 		titles.push(item.getField('title'));
		// 	}
			
		// 	if (!titles.length) {
		// 		return;
		// 	}

		// 	var stringName = "Finds: ";

		// 	var str = document.getElementById('hello-world-zotero-strings').
		// 	getFormattedString(stringName, [titles.length]) + ":\n\n" +
		// 	titles.join("\n");

		// 	var ps = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
		// 		.getService(Components.interfaces.nsIPromptService);
		// 	ps.alert(null, "", str);
		// }
		notify: function(event, type, ids, extraData) {
			if (event == 'add' || event == 'modify' || event == 'delete') {
				// Increment a counter every time an item is changed
				Zotero.HelloWorldZotero.DB.query("UPDATE changes SET num = num + 1");
				
				if (event != 'delete') {
					// Retrieve the added/modified items as Item objects
					var items = Zotero.Items.get(ids);
				}
				else {
					var items = extraData;
				}
				
				//var search = new Zotero.Search();
				//var tagname = "c01";
				//search.addCondition('tag', 'is', tagname);
				//var results = search.search();

				//var items = z.Items.get(results);

				// Loop through array of items and grab titles
				var titles = [];
				for each(var item in items) {
					// For deleted items, get title from passed data
					if (event == 'delete') {
						titles.push(item.old.title ? item.old.title : '[No title]');
					}
					else {
						titles.push(item.getField('title'));
					}
				}
				
				if (!titles.length) {
					return;
				}
				
				// Get the localized string for the notification message and
				// append the titles of the changed items
				var stringName = 'notification.item' + (titles.length==1 ? '' : 's');
				switch (event) {
					case 'add':
						stringName += "Added";
						break;
						
					case 'modify':
						stringName += "Modified";
						break;
						
					case 'delete':
						stringName += "Deleted";
						break;
				}
				//stringName += "tagname";
				
				var str = document.getElementById('hello-world-zotero-strings').
					getFormattedString(stringName, [titles.length]) + ":\n\n" +
					titles.join("\n");
			}
			
			var ps = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
				.getService(Components.interfaces.nsIPromptService);
			ps.alert(null, "", str);
		}
	}
};

// Initialize the utility
window.addEventListener('load', function(e) { Zotero.HelloWorldZotero.init(); }, false);