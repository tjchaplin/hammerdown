var Selector =  module.exports = exports = function Selector(element){

	return {
		hasClass : function(selector){
			var classes = this.attr('class');
			if(!classes)
				return false;

			var regexSelector = new RegExp(selector);
			var hasSelectorClass = classes.match(regexSelector);
			
			if(!hasSelectorClass)
				return false;
			
			if(hasSelectorClass[0] === '')
				return false;

			return true;
		},
		attr : function(selector){
			if(!selector)
				return;
			return element.attributes[selector.toUpperCase()];
		},
		css : function(selector){
				var styleAttr = this.attr('style');
				var styles = parseStyles(styleAttr);
				if(selector)
					return styles[selector];
				return styles;
			}
	};
};

var parseStyles = function(style){
	return style.split(';')
				.reduce(function(obj, str){
							var n = str.indexOf(':');
							if (n < 1 || n === str.length-1) return obj;
							obj[str.slice(0,n).trim()] = str.slice(n+1).trim();
							return obj;
						}, {});
};