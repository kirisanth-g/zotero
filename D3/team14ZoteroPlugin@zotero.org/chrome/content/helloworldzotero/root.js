Zotero.RootPlugin = {

	
	openWindow : function(){
		var strWindowFeatures = "resizable=no,chrome=yes,centerscreen=yes";
		this.win = window.openDialog('chrome://helloworldzotero/content/test_win.xul','testWin',strWindowFeatures);
	
	},
	getNewTag: function(){
		//this.tag_box = window.openDialog('chrome://helloworldzotero/content/tagbox.xul','tagBox');
		return this.win.prompt("Please enter the new tag: ","e.g. social psychology");
	},
	
	//DIMITAR - code starts here
	loadAllTags: function(){
		
		var all_tags = Zotero.Tags.getAll();//get all tags
		var tag_list = Zotero.RootPlugin.win.document.getElementById('taglist');
				this.getSelectedCBs();

		// empty all list items first, to avoid duplicates
		this.emptyListBox(tag_list); 
		for (tag in all_tags) {
			var tag_element = this.win.document.createElement('listitem');
			tag_element.setAttribute("type","checkbox");
			// set the id as the tag label since tags are unique
			tag_element.setAttribute("id", all_tags[tag]._get('id')); 
			tag_element.setAttribute("label", all_tags[tag]._get('name'));
			tag_list.appendChild(tag_element);
		}

		 
	},
	
	emptyListBox: function(listbox){
		var len = listbox.children.length;
		for (var x=0;x<len;x++)
		{
			listbox.removeChild(listbox.children[0]);
		}
	},
	
	getAllTaggedFiles: function(existingTags){
		var taggedFiles = []
		for(t in existingTags)
		{	
			var tag = Zotero.Tags.get(existingTags[t].getAttribute('id')); 
			var files = Zotero.Tags.getTagItems(tag._get('id'));
			taggedFiles = taggedFiles.concat(files);
		}
		return taggedFiles;
	},
	
	getSelectedCBs: function(){
		var selected = []
		var listbox = this.win.document.getElementById('taglist');
		for(var x=0;x<listbox.children.length;x++)
		{
			var tag_cb = listbox.children[x]
			if(tag_cb.checked){
				selected.push(tag_cb);
			}
		}
		
		return selected;
	},
	
	addMergeTagToFiles: function(mergeTag,taggedFiles){
		//add the tag to each of the files
		for (var i=0;i<taggedFiles.length;i++){
			Zotero.Items.get(taggedFiles[i]).addTag(mergeTag);
		}
		
	},
	
	Merge: function(){
		var mergeTag = this.getNewTag();
		var tags = this.getSelectedCBs();
		var taggedFiles = this.getAllTaggedFiles(tags);
		this.addMergeTagToFiles(mergeTag,taggedFiles);
		
	}
	
	
	
};
