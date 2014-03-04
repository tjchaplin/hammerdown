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
	describe("When appending header",function() {		
		describe("When appending an open header",function() {
			it("Should append header",function(){
				hammerDown.headerOpen();
				var expected = '\n\n# ';	

				var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
				appended.should.be.eql(expected);
			});

			describe("When appending an open level 2 header",function() {
				it("Should append header",function(){
					var level = 2;
					hammerDown.headerOpen(level);
					var expected = '\n\n## ';	

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
		});
		describe("When appending a close quote",function() {		
			it("Should append backtick",function(){
				hammerDown.headerClose();
				var expected = '\n\n';

				var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
	});
});