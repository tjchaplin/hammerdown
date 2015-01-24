var assert = require('assert');
var HtmlParser = require('../../../lib/htmlParser/htmlParser');
var stringToStream = require('../../../lib/utils/stringToStream');

describe("When parsing an html file",function(){
	var htmlParser = new HtmlParser();

	describe("when listening for depth events",function(){
		var depthData =  [];
		htmlParser.on('tagdepth',function(depth){
			depthData.push(depth);
		});
		describe("on open tag",function(){
			stringToStream("<html><h1></h1><h2></h2></html>").pipe(htmlParser);
			it("tagdepth should be emitted for each open and close",function(){
				assert(depthData.length === 4);
			});
			it("tagdepth should emit in correct sequence",function(){
				var expectedDepthData = [1,0,1,0];
				for (var i = 0; i < expectedDepthData.length; i++) {
					assert(expectedDepthData[i] === depthData[i]);
				}
			});
		});
	});
});