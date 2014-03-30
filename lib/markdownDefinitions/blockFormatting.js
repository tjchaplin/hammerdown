var prefix = require('../utils/prefix');

module.exports.prefixWithBlockQuote = function(data,depth){
	return prefix(data,"> ",depth);
};

module.exports.prefixWithBlockCode = function(data,depth){
	data = data.replace(/`/g,'');
	return prefix(data,"    ",depth);
};