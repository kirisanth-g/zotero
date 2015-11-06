Zotero.RootPlugin = {
	DB: null,
	
	myfunc: function() {
		window.openDialog('chrome://helloworldzotero/content/test_win.xul',
		'testWin','')
	},
};

// Initialize the utility
window.addEventListener('load', function(e) { Zotero.RootPlugin.init(); }, false);
