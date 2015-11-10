function addItem(){
	//clear();
	var input = document.getElementById('search bar');
	var tags = selectIdByTag(input.value);
	for (var files in tags){
		document.getElementById('list').appendItem(input.value);
	}
}

function clear(){
	var list = document.getElementById('list');
	list.SelectAll();
	list.ClearSelection();
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
	return ids
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
