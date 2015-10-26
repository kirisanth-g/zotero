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
Zotero.Tags.erase(ids);

function deleteTagById(ids){
	Zotero.Tags.erase(ids);
}

function addTagsById(ids, tags){
	for (var id in ids){
		ids[id].addTags(tags);
	}
}

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

}