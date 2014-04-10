module.exports = function(){
	return {
		_links : [],
		_linkMap : {},
		useReferences : true,
		linkReferences : function(){
			if (!this._links)
				return '';

			if (this._links.length === 0)
				return '';

			var linkReferences = '';
			for (var i = 0; i < this._links.length; i++) {
				linkReferences += "[" + i + "]: " + this._links[i] + "\n";
			}

			return linkReferences;
		},
		emailLink : function(text){
			return "<"+text+">";
		},
		currentLinkDefinition : null,
		link : function(text){
			if(this.currentLinkDefinition.href){
				if(this.currentLinkDefinition.href.indexOf("mailto:") >= 0)
					return this.emailLink(text);
			}

			var href = getLinkDefinitionHref(this.currentLinkDefinition);
			if(!this.useReferences)
				return "["+text+"]"+"("+href+")";

			this._addLinkReference(href);
			return "["+text+"]["+this._linkMap[href]+"]";
		},
		_addLinkReference : function(href){
			if(!this._linkMap[href])
				this._linkMap[href] = this._links.push(href) - 1;
		}
	};
};

var getLinkDefinitionHref = function(linkDefinition){
	if (!linkDefinition.href)
		linkDefinition.href = '';

	if (linkDefinition.title)
		linkDefinition.href += " \"" + linkDefinition.title + "\"";

	return linkDefinition.href;
};