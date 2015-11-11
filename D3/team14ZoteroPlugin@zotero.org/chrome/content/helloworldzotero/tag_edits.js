function addItem(){
	var input = document.getElementById('search bar');
	document.getElementById('list').appendItem(input.value);
	//var item = new Zotero.Item;
	var tgs = [input.value];
	var ids = getItemByTag(input.value);
	for (var id in ids) {
		//item = new Zotero.Items.get(id);
		document.getElementById('list').appendItem(id);
		//document.getElementById('list').appendItem(item.getField('title'));
	}
}

function clear(){
	var list = document.getElementById('list');
	list.SelectAll();
	list.ClearSelection();
}

function getItemByTag(t){
	var search = new Zotero.Search();
	search.addCondition('tag', 'is', t);
	var results = search.search();
	var items = Zotero.Items.get(results);
	return results;
}

function getTagsID(tags) {
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
