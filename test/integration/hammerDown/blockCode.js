var fs = require('fs');
var should = require('should');
var fixtureUtils = require('./fixtureUtils');
var HammerDown = require('../../../lib/hammerDown');


describe("When using hammerdown",function() {
	var resultDirectory =fixtureUtils.createTestDirectory();
	describe("When outputing blockcode with one line",function() {
		it("Should match expected",function(done){
			var testFixture = "blockCodeWithOneLine.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.blockCodeOpen()
						.text("block code line 1")
					.blockCodeClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing blockcode with text containing newlines",function() {
		it("Should match expected",function(done){
			var testFixture = "blockCodeContainingNewlines.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.blockCodeOpen()
						.text("block code line 1\nblock code line 2\n\nblock code line 4")
					.blockCodeClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing blockcode text starting with newlines",function() {
		it("Should match expected",function(done){
			var testFixture = "blockCodeStartingWithNewlines.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.blockCodeOpen()
						.text("\n\nblock code line 1")
					.blockCodeClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing inner blockcodes",function() {
		it("Should match expected",function(done){
			var testFixture = "innerBlockCode.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.blockCodeOpen()
						.text("block code line 1")
						.blockCodeOpen()
							.text("block code inner line 1")
							.blockCodeOpen()
								.text("\n\nblock code inner inner line 1")
							.blockCodeClose()
						.blockCodeClose()
					.blockCodeClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
});