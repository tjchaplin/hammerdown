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

	describe("When appending a block quote",function() {		
		describe("When appending a open block quote",function() {
			describe("When is the first block quote",function() {
				it("Should append block quote",function(){
					hammerDown.blockQuoteOpen();
					var expected = '\n\n';	

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
			describe("When is the second block quote",function() {
				it("Should append block quote",function(){
					hammerDown.writerState.currentState.blockQuoteDepth = 2;
					hammerDown.blockQuoteOpen();
					var expected = '\n';	

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
		});
		describe("When appending a close block quote",function() {		
			it("Should append paragraph ending",function(){
				hammerDown.blockQuoteClose();

				var expected = '\n\n';	

				var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
	});
});