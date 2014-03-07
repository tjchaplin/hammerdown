var util = require('util');
var Readable = require('stream').Readable;

var DocumentStream = module.exports = exports = function(options){

	if (!(this instanceof DocumentStream))
		return new DocumentStream(options);

	Readable.call(this);
	var self = this;
	
	if(!options)
		options = {};

	self.options = options;
	self.init();
};

util.inherits(DocumentStream,Readable);

DocumentStream.prototype.init = function(){
	var self = this;


	self.isDone = false;
	self.atNewline = false;
	self.atWordEnd = false;
	self.atParagraphEnd = false;
	self.trailingFormat = null;
	self.atDocumentStart = true;
};

DocumentStream.prototype._read = function() {
	if(this.isDone)
		this.push(null);
	else
		this.push('');
};

DocumentStream.prototype.done = function(){
	this.isDone = true;
};

DocumentStream.prototype.appendFormatted = function(data){
	var self = this;

	if(self.atDocumentStart)
		data = data.replace(/^[\n]+/,'');

	if(self.atParagraphEnd)
		data = data.replace(/^[\n]+/,'');

	if(self.atNewline)
		data = data.replace(/^[\n]+/,'');

	data = self.applyTrailing(data);
	self.updateDocumentPostion(data);
	data = self.formatTrailing(data);
	self.push(data);
	
	return self;
};

DocumentStream.prototype.appendRaw = function(data){
	if(!data)
		return this;

	if(this.atDocumentStart)
		data = data.replace(/^[\n]+/,'');

	this.updateDocumentPostion(data);
	this.push(data);
	return this;
};

DocumentStream.prototype.append = function(data){
	var self = this;
	
	var formattedData = self.formatData(data);
	if(!formattedData)
		return;

	formattedData = self.applyTrailing(formattedData);
	self.updateDocumentPostion(formattedData);
	formattedData = self.formatTrailing(formattedData);
	self.push(formattedData);
	
	return self;
};

DocumentStream.prototype.formatData= function(data){
	var self = this;
	if(!data)
		return;

	if(self.atWordEnd)
		return data.replace(/^[ \t\n]+/, '');

	var startsWithFormatting = /^[ \t]*\n/.test(data);
	if(startsWithFormatting)
		return data.replace(/^[ \t\n]+/, '\n');

	return data.replace(/^[ \t]+/, ' ');
};

DocumentStream.prototype.applyTrailing = function(data){
	if(!this.trailing)
		return data;

	var startsWithNewline = data.match(/^[\n]/);
	if(startsWithNewline)
		this.trailing = this.trailing.replace(/^[ \t]*/,'');
	
	data = this.trailing + data;
	this.trailing = null;

	return data;
};

DocumentStream.prototype.formatTrailing = function(data){
	var trailingFormat = data.match(/[ \t\n]*$/);

	if(!trailingFormat)
		return data;

	var whitespaceBeforeNewline = data.match(/[ \t]*[\n]$/);
	if(whitespaceBeforeNewline){
		if(whitespaceBeforeNewline[0] !== '')
			trailingFormat = data.match(/[\n]*$/);
	}

	if(trailingFormat[0] !== '')
		this.trailing = trailingFormat[0];
	
	return data.replace(/[ \t\n]*$/,'');
};

DocumentStream.prototype.updateDocumentPostion = function(data){
	var self = this;
	if(!data)
		return;

	self.atDocumentStart = false;
	self.atNewline = /\n$/.test(data);
	self.atWordEnd = /[ \t\n]$/.test(data);
	self.atParagraphEnd = /\n\n$/.test(data);
	
	return self;
};