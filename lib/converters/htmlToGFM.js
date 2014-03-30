var util = require("util");
var HtmlToMarkdown = require('./htmlToMarkdown');
var textFormatting = require('../markdownDefinitions/textFormatting');
var blockFormatting = require('../gfmDefinitions/blockFormatting');

var HtmlToGFM = module.exports = exports = function(){
	HtmlToMarkdown.call(this);
	this.extendedTagConversions();
};

util.inherits(HtmlToGFM,HtmlToMarkdown);

HtmlToGFM.prototype.extendedTagConversions = function() {
	var self = this;

	self.fencedCodeBlock = blockFormatting.fencedCodeBlock();

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
	// self.tagConversions['TR'] = {
	// 				open: function(){ return self.hammerdown.tableRowOpen();},
	// 				close: function(){return self.hammerdown.tableRowClose();}
	// 			};
	// self.tagConversions['TD'] = {
	// 				open: function(){ return self.hammerdown.tableDataOpen();},
	// 				close: function(){return self.hammerdown.tableDataClose();}
	// 			};
	// self.tagConversions['TH'] = {
	// 				open: function(){ return self.hammerdown.tableHeaderOpen();},
	// 				close: function(){return self.hammerdown.tableHeaderClose();}
	// 			};
};