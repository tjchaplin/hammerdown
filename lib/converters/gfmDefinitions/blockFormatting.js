module.exports.fencedCodeBlock = function(){
	return {
		_languages : [],
		withLanguage : function(language){
			this._languages.push(language);
		},
		prefixWithBlockCode : function(data){
			var language = this._languages.pop();
			if(!language)
				language = '';

			data = data.replace(/\\#/,'#');
			data = data.replace(/^\n*/,'');
			data = data.replace(/\n*$/,'');
			data = data.replace(/^``|^`/,'');
			data = data.replace(/``$|`$/,'');

			data = '```'+language+'\n'+data+'\n```';
			return '\n\n'+data;
		}
	};
};