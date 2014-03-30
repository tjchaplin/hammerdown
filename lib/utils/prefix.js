var prefix = module.exports = function(data,prefixValue,depth){
	if(!depth)
		depth = 1;

	var prefixSuffix = getPrefixSuffix(prefixValue,depth);

	data = data.replace(/^\n*/,'');
	data = data.replace(/[\n]$/,'');
	data = data.replace(/\n/g,'\n'+prefixSuffix);
	
	var doesntStartWithNewline = data.match(/^[^\n]/);
	if(doesntStartWithNewline)
		data = prefixSuffix+data;

	return '\n\n'+data;
};

var getPrefixSuffix = function(prefixValue,prefixDepth){
	var prefix = '';
	for(var i = 0; i < prefixDepth; i++){
		prefix += prefixValue;
	}

	return prefix;
};