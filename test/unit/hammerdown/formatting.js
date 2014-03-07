var sinon = require('sinon');
var should = require('should');
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

	describe("When appending line break",function() {		
		it("Should append line break",function(){
			var expected = '  \n';
			
			hammerDown.lineBreak();

			var appended = hammerDownStream.appendRaw.getCall(0).args[0];
			appended.should.be.eql(expected);
		});		
	});
	describe("When appending header marker",function() {		
		it("Should append header marker",function(){
			hammerDown.headerMarker();
			var expected = '\n\n---\n\n';	

			var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
			appended.should.be.eql(expected);
		});
	});
	describe("When appending paragraph",function() {		
		it("Should append two new lines",function(){
			hammerDown.paragraph();
			var expected = '\n\n';	

			var appended = hammerDownStream.appendRaw.getCall(0).args[0];
			appended.should.be.eql(expected);
		});
	});
});