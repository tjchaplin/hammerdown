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

	self.atNewline = false;
	self.atWordEnd = false;
	self.LineIsPrefixed = false;
	self.atParagraphEnd = false;
	self.trailingFormat = null;
	self.atDocumentStart = true;
};

DocumentStream.prototype._read = function() {
	this.push('');
};

DocumentStream.prototype.done = function(){
	this.push(null);
};

DocumentStream.prototype.append = function(data){
	if(!data)
		return this;

	if(this.atDocumentStart)
		data = data.replace(/^[\n]+/,'');

	this.updateDocumentPostion(data);
	this.push(data);
	return this;
};

DocumentStream.prototype.updateDocumentPostion = function(data){
	var self = this;

	if(data === null || data === undefined)
		return;

	if(self.atDocumentStart && data !== '')
		self.atDocumentStart = false;

	self.atNewline = /\n$/.test(data);
	self.atWordEnd = /[ \t\n]$/.test(data);
	self.atParagraphEnd = /\n\n$/.test(data);

	return self;
};