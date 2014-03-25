var trumpet = require('trumpet');
var $ = require('./utils/selector');

var HtmlFilterStream = module.exports = exports = function HtmlFilterStream() {
	var self = this;

	self.htmlFilter = trumpet();
	self.filterVisible();

	return self.htmlFilter;
};

HtmlFilterStream.prototype.filterVisible = function filterVisible() {
	var self = this;

	self.htmlFilter.selectAll('[style]', function (element) {
		if(!isVisible(element))
			element.createWriteStream({outer:true}).end("");
	});
	return self.htmlFilter;
};

var isVisible = function isHidden(element){
    var isDisplayEnabled = true;
    var isVisiblityEnabled = true;
	
    var displayValue = $(element).css('display');
    if(displayValue)
		isDisplayEnabled = displayValue.toLowerCase() !== 'none';

    var visibilityValue = $(element).css('visibility');
    if(visibilityValue)
		isVisiblityEnabled = visibilityValue.toLowerCase() !== 'hidden';

    return (isDisplayEnabled && isVisiblityEnabled);
};