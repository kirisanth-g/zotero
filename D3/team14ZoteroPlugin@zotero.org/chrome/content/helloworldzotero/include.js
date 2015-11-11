// Only create main object once
if (!Zotero.RootPlugin) {
	let loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
					.getService(Components.interfaces.mozIJSSubScriptLoader);
	loader.loadSubScript("chrome://helloworldzotero/content/root.js");
	loader.loadSubScript("chrome://helloworldzotero/content/tag_edits.js");
	var Zotero = Components.classes["@zotero.org/Zotero;1"]
				.getService(Components.interfaces.nsISupports)
				.wrappedJSObject;
}
