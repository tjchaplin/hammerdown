var util = require("util");
var HtmlToMarkdown = require('./htmlToMarkdown');
var Hammerdown = require("hammerdown").githubFlavoredHammerDown;

var HtmlToGithubFlavoredMarkdown = module.exports = exports = function(){
	HtmlToMarkdown.call(this);
	this.hammerdown = new Hammerdown();
	this.extendedTagConversions();
};

util.inherits(HtmlToGithubFlavoredMarkdown,HtmlToMarkdown);

HtmlToGithubFlavoredMarkdown.prototype.extendedTagConversions = function() {
	var self = this;
	
	self.tagConversions['CODE'] = {
					open: function(language){ return self.hammerdown.codeOpen(language);},
					close: function(){return self.hammerdown.codeClose();}
				};
	self.tagConversions['TR'] = {
					open: function(){ return self.hammerdown.tableRowOpen();},
					close: function(){return self.hammerdown.tableRowClose();}
				};
	self.tagConversions['TD'] = {
					open: function(){ return self.hammerdown.tableDataOpen();},
					close: function(){return self.hammerdown.tableDataClose();}
				};
	self.tagConversions['TH'] = {
					open: function(){ return self.hammerdown.tableHeaderOpen();},
					close: function(){return self.hammerdown.tableHeaderClose();}
				};
};