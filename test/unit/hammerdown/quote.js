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
	describe("When appending quote",function() {		
		describe("When appending an open quote",function() {		
			it("Should append quote",function(){
				hammerDown.quoteOpen();
				var expected = '"';	

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
		describe("When appending a close quote",function() {		
			it("Should append quote",function(){
				hammerDown.quoteClose();
				var expected = '"';

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
	});
});