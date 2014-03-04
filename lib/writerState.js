WriterState = module.exports = exports = function(documentStream,options){
	var self = this;

	this.state = [];
	self.currentState = {
		order : 1,
		listDepth : 0,
		inCode : false,
		headerColumns : 0,
		blockCodeDepth : 0,
		inBlockCode : false,
		blockQuoteDepth : 0,
		inBlockQuote : false,
		atTableHeader : false,
		inOrderedList : false
	};
};

WriterState.prototype.saveCurrentState = function(){
	var stateToSave = {};
	for(var i in this.currentState)
		stateToSave[i] = this.currentState[i];

	this.state.push(stateToSave);
};

WriterState.prototype.previousState = function() {
	var previousState = this.state.pop();
	if(!previousState)
		return;
	this.currentState = previousState;
};

WriterState.prototype.incrementOrder = function(){
	return this.currentState.order++;
};

WriterState.prototype.isInOrderedList = function(){

	return this.currentState.inOrderedList;
};

WriterState.prototype.inOrderedList = function(value){
	if(value === null || value === undefined)
		value = true;

	this.saveCurrentState();
	this.currentState.order = 1;
	this.currentState.inOrderedList = value;
};

WriterState.prototype.isInBlockCode = function(){
	return this.currentState.inBlockCode;
};

WriterState.prototype.inBlockCode = function(value) {
	if(value === null || value === undefined)
		value = true;

	this.saveCurrentState();
	this.currentState.blockCodeDepth++;
	this.currentState.inBlockCode = value;
	return this;
};

WriterState.prototype.blockCodeDepth = function() {
	return this.currentState.blockCodeDepth;
};

WriterState.prototype.isInBlockQuote = function(){
	return this.currentState.inBlockQuote;
};

WriterState.prototype.inBlockQuote = function(value) {
	if(value === null || value === undefined)
		value = true;

	this.saveCurrentState();
	this.currentState.blockQuoteDepth++;
	this.currentState.inBlockQuote = value;
	return this;
};

WriterState.prototype.blockQuoteDepth = function() {
	return this.currentState.blockQuoteDepth;
};

WriterState.prototype.isInCode = function() {
	return this.currentState.inCode;
};

WriterState.prototype.inCode = function(value) {
	if(value === null || value === undefined)
		value = true;

	this.saveCurrentState();
	this.currentState.inCode = value;
	return this;
};

WriterState.prototype.isAtTableHeader = function() {
	return this.currentState.atTableHeader;
};

WriterState.prototype.atTableHeader = function(value) {
	if(value === null || value === undefined)
		value = true;

	this.saveCurrentState();
	this.currentState.atTableHeader = true;
	return this;
};

WriterState.prototype.incrementHeaderColumns = function(headerColumns) {
	if(!headerColumns)
		headerColumns = 1;
	
	this.currentState.headerColumns += headerColumns;
};

WriterState.prototype.headerColumns = function() {
	return this.currentState.headerColumns;
};

WriterState.prototype.listDepth = function() {
	return this.currentState.listDepth;
};

WriterState.prototype.incrementListDepth = function(value) {
	if(!value)
		value = 1;
	this.saveCurrentState();
	this.currentState.listDepth+=value;
	return this;
};