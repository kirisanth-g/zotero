var Zotero = Components.classes["@zotero.org/Zotero;1"].getService(Components.interfaces.nsISupports).wrappedJSObject;

function addItem(){
	// Clear the Search list
	clear();
	var displayList = document.getElementById('list');
	// Pull the current input in the search field
	var indices = getItemByTag(getSearchValue());
	// If items exists with said tag, display in the list
	if (indices){
		for (index in indices){
				var items = Zotero.Items.get(index);
				displayList.appendItem(index);
				if (items.isAttachment())
					displayList.appendItem(item.getAttachments().filename);
		}
	} else 
		displayList.appendItem("'" + getSearchValue() + "' tag does not exist.");
}

/* Return Array of tags from user input id 'search bar.' 
   Return Empty Array if user input is Null */
function getSearchValue(){
	var input = document.getElementById('search bar');
	return (input.value.split(' '));
}

/* Deletes the Tag from all items */
function deleteTags(){
	clear();
	var input = getSearchValue();
	if (input[0].length != 0){
		for (var i in input){
			var items = getTagID(input[i]);
			//If a file has tag
			if (items[0] != undefined){
				deleteTagById(items);
				document.getElementById('list').appendItem("'" + input[i] + "' tag deleted from all files.");
			//check if tag is nonexistant
			} else 
				document.getElementById('list').appendItem("'" + input[i] + "' tag does not exist.");
		}
	} else
		document.getElementById('list').appendItem("no input from search bar");
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

/* Delete the tag given a list of tags. DOES NOT ERASE FROM IDS*/
function deleteTagById(ids){
	Zotero.Tags.erase(ids);
}

//--------------------------Doesn't work----------------------------
function addTagsById(ids, tags){
	for (var id in ids){
		ids[id].addTags(tags);
	}
}

//------------------------- Doesn't work----------------------------
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
