var util = require("util");
var HtmlToMarkdown = require('./htmlToMarkdown');
var blockFormatting = require('./gfmDefinitions/blockFormatting');
var tableFormatting = require('./gfmDefinitions/tableFormatting');
var textFormatting = require('./markdownDefinitions/textFormatting');

var HtmlToGFM = module.exports = exports = function(){
	HtmlToMarkdown.call(this);
	this.extendedTagConversions();
};

util.inherits(HtmlToGFM,HtmlToMarkdown);

HtmlToGFM.prototype.extendedTagConversions = function() {
	var self = this;

	self.fencedCodeBlock = blockFormatting.fencedCodeBlock();
	self.tableFormatting = tableFormatting();

	self.tagConversions['PRE'] = {
		text: function(textData){
			return self.fencedCodeBlock.prefixWithBlockCode(textData);
		}
	};
	self.tagConversions['CODE'] = {
		open: function(language){
			self.fencedCodeBlock.withLanguage(language);
		},
		text : function(textData){
			return textFormatting.code(textData);
		}
	};
	self.tagConversions['TABLE'] = {
		text : function(textData){
			return self.tableFormatting.table(textData);
		}
	};
	self.tagConversions['TH'] = {
		text : function(textData){
			return self.tableFormatting.header(textData);
		}
	};
	self.tagConversions['TD'] = {
		text : function(textData){
			return self.tableFormatting.data(textData);
		}
	};
	self.tagConversions['TR'] = {
		text : function(textData){
			return self.tableFormatting.row(textData);
		}
	};
};