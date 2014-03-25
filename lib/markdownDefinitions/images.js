module.exports = {
	_imageLinks : [],
	_linkMap : {},
	useReferences : true,
	linkReferences : function(){
		if (!this._imageLinks)
			return '';

		if (this._imageLinks.length === 0)
			return '';

		var linkReferences = '';
		for (var i = 0; i < this._imageLinks.length; i++) {
			linkReferences += "[" + i + "]: " + this._imageLinks[i] + "\n";
		}

		return linkReferences;
	},
	currentImageDefinition : null,
	image : function(){
		var imageDefinition = this.currentImageDefinition;
		var imageSrc = getImageDefinitionSrc(imageDefinition);
		var imageName = getImageDefinitionName(imageDefinition);

		if(!this.useReferences)
				return "![" + imageName + "](" + imageSrc + ")";

		this._addLinkReference(imageSrc);
		return "!["+imageName+"]["+this._linkMap[imageSrc]+"]";
	},
	_addLinkReference : function(href){
		if(!this._linkMap[href])
			this._linkMap[href] = this._imageLinks.push(href) - 1;
	}
};

var getImageDefinitionName = function(imageDefinition){
	if(!imageDefinition.alt)
		imageDefinition.alt = '';

	return imageDefinition.alt;
};

var getImageDefinitionSrc = function(imageDefinition){
	if(!imageDefinition)
		imageDefinition = {};

	if(!imageDefinition.src)
		imageDefinition.src = '';

	if (imageDefinition.title)
		imageDefinition.src += " \"" + imageDefinition.title + "\"";

	return imageDefinition.src;
};