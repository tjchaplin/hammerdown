var DocumentStream = require('./documentStream');
var MarkdownWriterState = require('./writerState');
var textFormatter = require('./utils/textFormatter');
var stringExtensions = require('./utils/stringExtensions');

var HammerDown = module.exports = exports = function HammerDown(options){
	var self = this;

	if(!options)
		options = {};

	this.links = [];
	self.linkMap = {};
	self.options = options;
	self.documentStream = new DocumentStream();
	self.writerState = new MarkdownWriterState();
};

HammerDown.prototype.readableStream = function() {
	return this.documentStream;
};

HammerDown.prototype.done = function() {
	this.linkReferences();
	this.documentStream.done();
	return this;
};

HammerDown.prototype.text = function(text) {
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

HammerDown.prototype.paragraph = function(){
	this.documentStream.appendFormatted("\n\n");
	return this;
};

HammerDown.prototype.lineBreak = function(){
	this.documentStream.appendRaw("  \n");
	return this;
};

HammerDown.prototype.headerMarker = function(){
    this.documentStream.appendFormatted("\n\n---\n\n");
    return this;
};

HammerDown.prototype.blockCodeOpen = function(){
	var prefix = '\n';
	if(this.writerState.blockCodeDepth() === 0)
		prefix = '\n\n';

	this.writerState.inBlockCode();
	this.documentStream.appendFormatted(prefix);
	return this;
};

HammerDown.prototype.blockCodeClose = function(){
	this.writerState.previousState();

	if(!this.writerState.isInBlockCode())
		this.documentStream.appendFormatted('\n\n');

	return this;
};

HammerDown.prototype.prefixWithBlockCode = function(data){
	if(!this.writerState.isInBlockCode())
		return data;

	return this.prefixData(data,"    ",this.writerState.blockCodeDepth());
};

HammerDown.prototype.prefixWithBlockQuote = function(data){
	if(!this.writerState.isInBlockQuote())
		return data;

	return this.prefixData(data,"> ",this.writerState.blockQuoteDepth());
};

HammerDown.prototype.prefixData = function(data,prefixValue,prefixDepth){
	var prefix = '';
	for(var i = 0; i < prefixDepth; i++)
		prefix += prefixValue;

	data = data.replace(/\n/g,'\n'+prefix);
	var doesntStartWithNewline = data.match(/^[^\n]/);
	if(doesntStartWithNewline)
		data = prefix+data;

	return data;
};

HammerDown.prototype.blockQuoteOpen = function(){
	if(this.writerState.blockQuoteDepth() === 0)
		this.documentStream.appendFormatted('\n\n');
	else
		this.documentStream.appendFormatted('\n');

	this.writerState.inBlockQuote();
	return this;
};

HammerDown.prototype.blockQuoteClose = function(){
	this.writerState.previousState();

	if(!this.writerState.isInBlockQuote())
		this.documentStream.appendFormatted('\n\n');
	return this;
};

HammerDown.prototype.emphasisOpen = function(){
	this.documentStream.append('*');
	return this;
};
HammerDown.prototype.emphasisClose = function(){
	this.documentStream.append('*');
	return this;
};

HammerDown.prototype.tableHeaderOpen = function(){
	if(!this.writerState.isAtTableHeader())
		this.writerState.atTableHeader();

	this.writerState.incrementHeaderColumns();
	this.tableDataOpen();
	return this;
};

HammerDown.prototype.tableHeaderClose = function(){
	return this;
};

HammerDown.prototype.tableDataOpen = function(){
	this.documentStream.appendFormatted('|');
	return this;
};

HammerDown.prototype.tableDataClose = function(){
	return this;
};

HammerDown.prototype.tableRowHeader = function(){
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

HammerDown.prototype.tableRowOpen = function(){
	this.documentStream.appendFormatted('\n\n');
	return this;
};

HammerDown.prototype.tableRowClose = function(){
	if(this.writerState.isAtTableHeader())
		return this.tableRowHeader();

	this.documentStream.appendFormatted('|\n');
	return this;
};

HammerDown.prototype.boldOpen = function() {
	this.documentStream.append('**');
	return this;
};

HammerDown.prototype.boldClose = function() {
	this.documentStream.append('**');
	return this;
};

HammerDown.prototype.quoteOpen = function() {
	this.documentStream.append('"');
	return this;
};

HammerDown.prototype.quoteClose = function() {
	this.documentStream.append('"');
	return this;
};

HammerDown.prototype.codeOpen = function() {
	this.writerState.inCode();
	this.documentStream.append('`');
	return this;
};
HammerDown.prototype.codeClose = function() {
	this.writerState.previousState();
	this.documentStream.append('`');
	return this;
};

HammerDown.prototype.headerOpen = function(level){
	if(!level)
		level = 1;

	var headerOutput = '\n\n';
	for (var i = 0; i < level; i++) {
			headerOutput += '#';
	}
	headerOutput += ' ';

	this.documentStream.appendFormatted(headerOutput);
	return this;
};

HammerDown.prototype.headerClose = function(level){
	this.documentStream.appendFormatted('\n\n');
	return this;
};

HammerDown.prototype.image = function(imageDefinition) {
	if(!imageDefinition)
		imageDefinition = {};

	if(!imageDefinition.src)
		imageDefinition.src = '';

	if(!imageDefinition.alt)
		imageDefinition.alt = '';

	var imageOutput = "![" + imageDefinition.alt + "](" + imageDefinition.src + ")";
	this.documentStream.append(imageOutput);
	return this;
};

HammerDown.prototype.orderedListOpen = function() {
	this.writerState.inOrderedList();
	this.listOpen();
	return this;
};

HammerDown.prototype.orderedListClose = function() {
	this.writerState.previousState();
	this.listClose();
	return this;
};

HammerDown.prototype.unOrderedListOpen = function() {
	this.writerState.inOrderedList(false);
	this.listOpen();
	return this;
};

HammerDown.prototype.unOrderedListClose = function() {
	this.writerState.previousState();
	this.listClose();
	return this;
};

HammerDown.prototype.listOpen = function(){

	var listOutput = '\n';

	if(this.writerState.listDepth() === 0)
		listOutput += '\n';

	this.writerState.incrementListDepth();
	this.documentStream.appendFormatted(listOutput);
	return this;
};

HammerDown.prototype.listClose = function(){
	this.writerState.previousState();
	return this;
};

HammerDown.prototype.listItemOpen = function(){
  var listItem = '* ';
  if(this.writerState.isInOrderedList())
	listItem = '' + (this.writerState.incrementOrder()) + '. ';

  listItem = stringExtensions.padLeft(listItem, (this.writerState.listDepth() - 1) * 2);
  this.documentStream.appendFormatted(listItem);
  return this;
};

HammerDown.prototype.listItemClose = function(){
	this.documentStream.appendFormatted('\n');
	return this;
};

HammerDown.prototype.linkOpen = function(linkDefinition){

	this.documentStream.appendFormatted('[');
	this.writerState.saveLinkDefinition(linkDefinition);
	return this;
};

HammerDown.prototype.linkClose = function(){
	var linkDefinition = this.writerState.linkDefinition();

	var href = linkDefinition.href;
	var title = linkDefinition.title;

	if (!href)
		href = '';

	if (title)
		href += " \"" + title + "\"";

	var suffix = "(" + href + ")";
	if(this.options.referenceLinks){
		var innerLink = '';
		if(this.linkMap[href]){
			innerLink = this.linkMap[href];
		}
		else{
			this.linkMap[href] = this.links.push(href) - 1;
			innerLink = this.linkMap[href];
		}
		suffix = "["+ innerLink + "]";
	}

	this.documentStream.appendFormatted("]" + suffix);
	this.writerState.previousState();
	return this;
};

HammerDown.prototype.linkReferences = function(){
  if (!this.links)
    return this;

  if (this.links.length === 0)
    return this;

  var linkReferences = '\n\n';
  for (var i = 0; i < this.links.length; i++) {
      linkReferences += "[" + i + "]: " + this.links[i] + "\n";
  }
  this.documentStream.appendFormatted(linkReferences);
  return this;
};