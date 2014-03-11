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
	
	describe("When appending a block code",function() {		
		describe("When appending a open block code",function() {
			describe("When is the first block quote",function() {
				it("Should append two newlines",function(){
					hammerDown.blockCodeOpen();
					var expected = '\n';	

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
			describe("When is the second block code",function() {
				it("Should append block newline",function(){
					hammerDown.writerState.currentState.blockCodeDepth = 2;
					hammerDown.blockCodeOpen();
					var expected = '\n';	

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});

			it("Should mark document as in block code",function(){
				hammerDown.blockCodeOpen();
				hammerDown.writerState.isInBlockCode().should.be.eql(true);
			});
		});
		describe("When appending a close block code",function() {		
			it("Should append newline",function(){
				hammerDown.blockCodeClose();
				var expected = '\n';	

				var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
				appended.should.be.eql(expected);
			});

			it("Should restore previous document state",function(){
				hammerDown.blockCodeClose();
				hammerDown.writerState.isInBlockCode().should.be.eql(false);
			});
		});
	});
	
});