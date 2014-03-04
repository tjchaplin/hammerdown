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
	
	describe("When appending an emphasis",function() {		
		describe("When appending a open emphasis",function() {		
			it("Should append emphasis",function(){
				hammerDown.emphasisOpen();
				var expected = '*';	

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
		describe("When appending a close emphasis",function() {		
			it("Should append paragraph ending",function(){
				hammerDown.emphasisClose();

				var expected = '*';	

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
	});
	describe("When appending bold",function() {		
		describe("When appending an open bold",function() {		
			it("Should append bold",function(){
				hammerDown.boldOpen();
				var expected = '**';	

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
		describe("When appending a close bold",function() {		
			it("Should append pbold",function(){
				hammerDown.boldClose();
				var expected = '**';

				var appended = hammerDownStream.append.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
	});
});