module.exports.emphasis = function(text){
	return '*'+text+'*'
};

module.exports.bold = function(text) {
	return '**'+text+'**'
};

module.exports.quote = function(text){
	return '"'+text+'"';
};

module.exports.code = function(text){
	if((/`/).test(text))
		text = '`'+text+'`';

	return '`'+text+'`'
};

module.exports.header = function(text,level){
	if(!level)
		level = 1;

	var headerOutput = '';
	for (var i = 0; i < level; i++) {
		headerOutput += '#';
	}
	headerOutput += ' ';

	return headerOutput+text;
};