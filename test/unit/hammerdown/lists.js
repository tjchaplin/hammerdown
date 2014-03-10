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
	
	describe("When appending list",function() {
		describe("When appending an open list",function() {
			describe("When list depth is 0",function() {
				it("Should append paragraph",function(){
					hammerDown.listOpen();
					var expected = '';

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
			describe("When list depth is > 0",function() {

				it("Should append newline",function(){
					hammerDown.writerState.incrementListDepth();
					hammerDown.listOpen();
					var expected = '';

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
		});
	});
	describe("When appending ordered list",function() {
		describe("When appending an open ordered list",function() {
			describe("When list depth is 0",function() {
				it("Should append paragraph",function(){
					hammerDown.listOpen();
					var expected = '';

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
			describe("When list depth is > 0",function() {

				it("Should append newline",function(){
					hammerDown.writerState.incrementListDepth();
					hammerDown.listOpen();
					var expected = '';

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
		});
	});
	describe("When appending list item",function() {
		describe("When appending an open list item",function() {
			describe("When list depth is 0",function() {
				it("Should append list item",function(){
					hammerDown.writerState.incrementListDepth();
					hammerDown.listItemOpen();
					var expected = '* ';

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
			describe("When list depth is > 0",function() {
				it("Should append list item",function(){
					hammerDown.writerState.incrementListDepth(3);
					hammerDown.listItemOpen();
					var expected = '    * ';

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
		});
	});
	describe("When appending ordered list item",function() {
		describe("When appending an open list item",function() {
			describe("When list depth is 0",function() {
				it("Should append ordered list item",function(){
					hammerDown.writerState.incrementListDepth();
					hammerDown.writerState.inOrderedList();
					hammerDown.listItemOpen();
					var expected = '1. ';

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
			describe("When list depth is > 0",function() {
				it("Should append ordered list item",function(){
					hammerDown.writerState.incrementListDepth(3);
					hammerDown.writerState.inOrderedList();
					hammerDown.listItemOpen();
					var expected = '    1. ';

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
		});
	});
	describe("When closed list item",function() {
		it("Should append new line",function(){
			hammerDown.listItemClose();
			var expected = '';

			var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
			appended.should.be.eql(expected);
		});
	});
});