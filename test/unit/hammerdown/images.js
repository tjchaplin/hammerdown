var sinon = require('sinon');
var HammerDown = require('../../../lib/hammerDown');

describe("When wrting markdown",function() {
	var hammerDown;
	var hammerDownStream;

	beforeEach(function(){
		hammerDown = new HammerDown();

		hammerDownStream = hammerDown.readableStream();
		sinon.spy(hammerDownStream,'append');
		sinon.spy(hammerDownStream,'appendRaw');
		sinon.spy(hammerDownStream,'appendFormatted');
	});
	describe("When appending image",function() {
		describe("When no image definition specified",function() {
			it("Should append empty image",function(){
				hammerDown.image();
				var expected = '![]()';	

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
		describe("When image definition source specified",function() {
			it("Should append image with source definition",function(){
				var imageDefinition = {src:"/someSource.png"};
				hammerDown.image(imageDefinition);
				var expected = '![](/someSource.png)';	

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
		describe("When image definition alt specified",function() {
			it("Should append image with alt definition",function(){
				var imageDefinition = {alt:"some alt"};
				hammerDown.image(imageDefinition);
				var expected = '![some alt]()';	

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
		describe("When image definition alt and source specified",function() {
			it("Should append image with alt and source definition",function(){
				var imageDefinition = {src:"/someSource.png",alt:"some alt"};
				hammerDown.image(imageDefinition);
				var expected = '![some alt](/someSource.png)';	

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
	});
});