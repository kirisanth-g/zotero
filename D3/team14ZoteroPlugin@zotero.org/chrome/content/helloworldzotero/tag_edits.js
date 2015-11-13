var Zotero = Components.classes["@zotero.org/Zotero;1"].getService(Components.interfaces.nsISupports).wrappedJSObject;

function addItem(){
	var displayList = document.getElementById('list');
	// Clear the Search list
	clear();
	//document.getElementById('list').removeAllItems();
	// Pull the current input in the search field
	var input = document.getElementById('search bar');
	var items = getItemByTag(input.value);
	// If items exists with said tag, display in the list
	if (items){
		for (index in items){
			displayList.appendItem(index);
		}
	}
}

/* Deletes the Tag from all items */
function deleteTags(){
	var input = document.getElementById('search bar');
	if (input != null){
		var items = getTagID(input.value);
		deleteTagById(items);
	}
}

/*function unTagOne(){
	var file = document.getElementById('list');
	selected = file.selectedItem();
	if (selected != null){
	}
}*/

/* Clears the search field */
function clear(){
	var displayList = document.getElementById('list');
    var count = displayList.itemCount;
    while(count-- > 0){
        displayList.removeItemAt(0);
    }
}

/* Returns the ID of items given a tag */
function getItemByTag(t){
	var search = new Zotero.Search();
	search.addCondition('tag', 'is', t);
	var results = search.search();
	return Zotero.Items.get(results);
}

/* Returns the ID of tags given a list of tags */
function getTagsID(tags) {
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

/* Returns the ID of tags given a tag */
function getTagID(tag) {
	var tags = [];
	tags.push(tag);
	return getTagsID(tags);
}

/* Delete the tag given a list of tags */
function deleteTagById(ids){
	Zotero.Tags.erase(ids);
}

//--------------------------Doesn't work----------------------------
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
	var ids = getTagID(old_tag);
	deleteTagById(ids);
	addTagsById(ids, new_tag);
}
