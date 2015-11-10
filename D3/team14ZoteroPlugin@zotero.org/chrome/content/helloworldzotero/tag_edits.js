var Zotero = Components.classes["@zotero.org/Zotero;1"].getService(Components.interfaces.nsISupports).wrappedJSObject;

function addItem(){
	var input = document.getElementById('search bar');
	var ids = selectIdByTag(input.value);
	for (var files in ids){
		document.getElementById('list').appendItem(files);
	}
}

function clear(){
	var list = document.getElementById('list');
	list.SelectAll();
	list.ClearSelection();
}

function testSelectbyTags(tags){
	var search = new Zotero.Search();
	search.addCondition(tags);
	return search;
}

function selectIdByTags(tags) {
	var ids = [];
	var allTags = Zotero.Tags.search();
	tags = tags.map(tag => tag.toLowerCase());
	for (var id in allTags) {
	    if (tags.indexOf(allTags[id].name.toLowerCase()) != -1) {
	      ids.push(id);
	    }
	}
	return ids;
}

function selectIdByTag(tag) {
	var tags = [];
	tags.push(tag);
	return selectIdByTags(tags);
}

function deleteTagById(ids){
	Zotero.Tags.erase(ids);
}
	//Doesn't work
function addTagsById(ids, tags){
	for (var id in ids){
		ids[id].addTags(tags);
	}
}

	// Doesn't work
function addTagById(ids, tag){
	var tags = [];
	tags.push(tag);
	return addTagById(ids, tags);
}

function replaceTag(old_tag, new_tag){
	var ids = selectIdByTag(old_tag);
	deleteTagById(ids);
	addTagsById(ids, new_tag);
}
