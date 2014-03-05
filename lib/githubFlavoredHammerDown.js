var util = require('util');
var Hammerdown = require('./hammerdown');
var DocumentStream = require('./documentStream');
var MarkdownWriterState = require('./writerState');
var textFormatter = require('./utils/textFormatter');
var stringExtensions = require('./utils/stringExtensions');

var GithubFlavoredHammerDown = module.exports = exports = function GithubFlavoredHammerDown(options){
	Hammerdown.call(this,options);
};

util.inherits(GithubFlavoredHammerDown,Hammerdown);

GithubFlavoredHammerDown.prototype.text = function(text) {
	var self = this;
	var formattedText = text;

	if(self.writerState.isInBlockQuote()){
		text = self.prefixWithBlockQuote(text);
		self.documentStream.append(text);
		return self;
	}

	if(self.writerState.isInBlockCode()){
		text = self.prefixWithBlockCode(text);
		self.documentStream.appendFormatted(text);
		return self;
	}

	if(self.writerState.isInCode())
		formattedText = text.replace(/`/g, '\\`');

	formattedText = textFormatter.format(text);
	self.documentStream.append(formattedText);

	return self;
};

GithubFlavoredHammerDown.prototype.blockCodeOpen = function(){
	var prefix = '\n';
	if(this.writerState.blockCodeDepth() === 0)
		prefix = '\n\n';

	this.writerState.inBlockCode();
	this.documentStream.appendFormatted(prefix);
	return this;
};

GithubFlavoredHammerDown.prototype.blockCodeClose = function(){
	this.writerState.previousState();

	if(!this.writerState.isInBlockCode())
		this.documentStream.appendFormatted('\n\n');

	return this;
};

GithubFlavoredHammerDown.prototype.prefixWithBlockCode = function(data){
	if(!this.writerState.isInBlockCode())
		return data;

	return this.prefixData(data,"    ",this.writerState.blockCodeDepth());
};

GithubFlavoredHammerDown.prototype.tableHeaderOpen = function(){
	if(!this.writerState.isAtTableHeader())
		this.writerState.atTableHeader();

	this.writerState.incrementHeaderColumns();
	this.tableDataOpen();
	return this;
};

GithubFlavoredHammerDown.prototype.tableHeaderClose = function(){
	return this;
};

GithubFlavoredHammerDown.prototype.tableDataOpen = function(){
	this.documentStream.appendFormatted('|');
	return this;
};

GithubFlavoredHammerDown.prototype.tableDataClose = function(){
	return this;
};

GithubFlavoredHammerDown.prototype.tableRowHeader = function(){
	if(this.writerState.headerColumns() === 0)
		return;

	var rowHeaderData = '|\n|';
	for (var i = 0; i < this.writerState.headerColumns(); i++) {
		rowHeaderData += '---|';
	}
		
	rowHeaderData += '\n'; 
	this.writerState.previousState();
	this.documentStream.appendFormatted(rowHeaderData);
	return this;
};

GithubFlavoredHammerDown.prototype.tableRowOpen = function(){
	this.documentStream.appendFormatted('\n\n');
	return this;
};

GithubFlavoredHammerDown.prototype.tableRowClose = function(){
	if(this.writerState.isAtTableHeader())
		return this.tableRowHeader();

	this.documentStream.appendFormatted('|\n');
	return this;
};