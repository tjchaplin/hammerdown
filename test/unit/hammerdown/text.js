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
	describe("When appending text",function(){
		describe("When not in a block quote or block code",function() {			
			describe("When text only contains non-words or numbers",function() {
				it("Should not append",function(){
					hammerDown.writerState.inCode();
					var data = ' \n \t  \n\r\n';
					var expected = '';
					
					hammerDown.text(data);

					hammerDownStream.append.called.should.be.eql(false);
				});
			});
			describe("When text contains non-words or numbers and words and numbers",function() {
				it("Should append",function(){
					hammerDown.writerState.inCode();
					var data = '\nother text';
					var expected = '\nother text';
					
					hammerDown.text(data);

					var appended = hammerDownStream.append.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
		});
		describe("When in a code block",function() {			
			describe("When text contains backticks",function() {
				it("Should append text with escape ticks to document",function(){
					hammerDown.writerState.inCode();
					var data = '`code`';
					var expected = '\\`code\\`';
					
					hammerDown.text(data);

					var appended = hammerDownStream.append.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
		});
		describe("When in a block code",function() {
			describe("When in a block Code depth of one",function() {			
				describe("When text doesn't start with a newline",function() {
					it("Should append block Code element to begining",function(){
						hammerDown.writerState.inBlockCode();
						var data = 'someBlockCode line';
						var expected = '    someBlockCode line';
						
						hammerDown.text(data);

						var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
						appended.should.be.eql(expected);
					});
				});
				describe("When text starts with a newline",function() {
					it("Should append block Code element after newline",function(){
						hammerDown.writerState.inBlockCode();
						var data = '\nsomeBlockCode line';
						var expected = '\n    someBlockCode line';
						
						hammerDown.text(data);

						var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
						appended.should.be.eql(expected);
					});
				});
				describe("When text contains a newline",function() {
					it("Should append block Code element after newline",function(){
						hammerDown.writerState.inBlockCode();
						var data = 'someBlockCode line1\nsomeBlockCode line2';
						var expected = '    someBlockCode line1\n    someBlockCode line2';
						
						hammerDown.text(data);

						var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
						appended.should.be.eql(expected);
					});
				});
				describe("When text end in a newline",function() {
					it("Should append block Code element after newline",function(){
						hammerDown.writerState.inBlockCode();
						var data = 'someBlockquote line1\n';
						var expected = '    someBlockquote line1\n    ';
						
						hammerDown.text(data);

						var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
						appended.should.be.eql(expected);
					});
				});
			});
		});
		describe("When in a block quote",function() {
			describe("When in a block quote depth of one",function() {			
				describe("When text doesn't start with a newline",function() {
					it("Should append block quote element to begining",function(){
						hammerDown.writerState.inBlockQuote();
						var data = 'someBlockquote line';
						var expected = '> someBlockquote line';
						
						hammerDown.text(data);

						var appended = hammerDownStream.append.getCall(0).args[0];
						appended.should.be.eql(expected);
					});
				});
				describe("When text starts with a newline",function() {
					it("Should append block quote element after newline",function(){
						hammerDown.writerState.inBlockQuote();
						var data = '\nsomeBlockquote line';
						var expected = '\n> someBlockquote line';
						
						hammerDown.text(data);

						var appended = hammerDownStream.append.getCall(0).args[0];
						appended.should.be.eql(expected);
					});
				});
				describe("When text contains a newline",function() {
					it("Should append block quote element after newline",function(){
						hammerDown.writerState.inBlockQuote();
						var data = 'someBlockquote line1\nsomeBlockquote line2';
						var expected = '> someBlockquote line1\n> someBlockquote line2';
						
						hammerDown.text(data);

						var appended = hammerDownStream.append.getCall(0).args[0];
						appended.should.be.eql(expected);
					});
				});
				describe("When text end in a newline",function() {
					it("Should append block quote element after newline",function(){
						hammerDown.writerState.inBlockQuote();
						var data = 'someBlockquote line1\n';
						var expected = '> someBlockquote line1\n> ';
						
						hammerDown.text(data);

						var appended = hammerDownStream.append.getCall(0).args[0];
						appended.should.be.eql(expected);
					});
				});
			});
		});
	});
	
});