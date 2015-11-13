var Zotero = Components.classes["@zotero.org/Zotero;1"].getService(Components.interfaces.nsISupports).wrappedJSObject;

function addItem(){
	var input = document.getElementById('search bar');
	var items = getItemByTag(input.value);
	if (items){
		for (index in items){
			var item = Zotero.Items.get(index);
			document.getElementById('list').appendItem(item.getFilename());
		}
	}
}

//SEMI WORKING, put "test" into search bar will delete tag if ALL files have this tag
function deleteTags(){
	var input = document.getElementById('search bar');
	if (input != null){
		var items = getItemByTag(input.value);
		for (var el in items){
			deleteTagById(el);
		}
	}
}

/*function unTagOne(){
	var file = document.getElementById('list');
	selected = file.selectedItem();
	if (selected != null){
	}
}*/

function clear(){
	document.getElementById('list').SelectAll().ClearSelection();
}

//NOT WORKING PROPERLY
function getItemByTag(t){
	var search = new Zotero.Search();
	search.addCondition('tag', 'is', t);
	var results = search.search();
	return results;
}

//DON'T THINK THIS WORKS, returns empty list
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
