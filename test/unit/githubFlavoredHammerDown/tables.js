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
	describe("When appending table header",function() {		
		it("Should append table separator",function(){
			hammerDown.tableHeaderOpen();
			var expected = '|';	

			var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
			appended.should.be.eql(expected);
		});
	});
	describe("When appending table data",function() {		
		it("Should append table separator",function(){
			hammerDown.tableDataOpen();
			var expected = '|';	

			var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
			appended.should.be.eql(expected);
		});
	});
	describe("When appending a table row",function() {		
		describe("When appending a open table row",function() {		
			it("Should append paragraph before",function(){
				hammerDown.tableRowOpen();
				var expected = '\n\n';	

				var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
		describe("When appending a close underline",function() {
			describe("When row is not a table header row",function() {			
				it("Should append paragraph ending",function(){
					hammerDown.tableRowClose();

					var expected = '|\n';	

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
			describe("When row is a table header row",function() {		
				it("Should append header separator for each row",function(){
					hammerDown.writerState.atTableHeader();
					hammerDown.writerState.incrementHeaderColumns(3);
					hammerDown.tableRowClose();
					var expected = '|\n|---|---|---|\n';	

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
		});
	});
});