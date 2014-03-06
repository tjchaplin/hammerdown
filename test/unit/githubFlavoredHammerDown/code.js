var sinon = require('sinon');
var should = require('should');
var HammerDown = require('../../../lib/githubFlavoredHammerDown');

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
		describe("When in a block code",function() {
			describe("When appending an open code",function() {
				it("Should append fenced code block",function(){
					hammerDown.writerState.inBlockCode();
					hammerDown.codeOpen();
					var expected = '```\n';	

					var appended = hammerDownStream.append.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
				it("Should mark document as in code",function(){
					hammerDown.codeOpen();
					hammerDown.writerState.isInCode().should.be.eql(true);
				});
			});
			describe("When appending an open code with a language reference",function() {
				it("Should append fenced code block with language reference",function(){
					hammerDown.writerState.inBlockCode();
					hammerDown.codeOpen("javascript");
					var expected = '```javascript\n';	

					var appended = hammerDownStream.append.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
				it("Should mark document as in code",function(){
					hammerDown.codeOpen();
					hammerDown.writerState.isInCode().should.be.eql(true);
				});
			});
			describe("When appending an close code",function() {
				it("Should append fenced code block",function(){
					hammerDown.writerState.inBlockCode();
					hammerDown.codeClose();
					var expected = '```\n';	

					var appended = hammerDownStream.append.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
				it("Should mark document as not in code",function(){
					hammerDown.codeClose();
					hammerDown.writerState.isInCode().should.be.eql(false);
				});
			});
		});
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
			it("Should mark document as not in code",function(){
				hammerDown.codeClose();
				hammerDown.writerState.isInCode().should.be.eql(false);
			});
		});
	});
});