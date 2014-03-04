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
	describe("When appending code",function() {		
		describe("When appending an open code",function() {		
			it("Should append code",function(){
				hammerDown.codeOpen();
				var expected = '`';	

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
			it("Should mark document as in code",function(){
				hammerDown.codeOpen();
				hammerDown.writerState.isInCode().should.be.eql(true);
			});
		});
		describe("When appending a close quote",function() {		
			it("Should append backtick",function(){
				hammerDown.codeClose();
				var expected = '`';

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
			it("Should mark document as in code",function(){
				hammerDown.codeClose();
				hammerDown.writerState.isInCode().should.be.eql(false);
			});
		});
	});
});