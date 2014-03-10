var fs = require('fs');
var should = require('should');
var fixtureUtils = require('./fixtureUtils');
var HammerDown = require('../../../lib/hammerDown');


describe("When using hammerdown",function() {
	var resultDirectory =fixtureUtils.createTestDirectory();
	describe("When outputing blockquote text starting with newlines",function() {
		it("Should match expected",function(done){
			var testFixture = "blockquoteStartingWithNewlines.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.blockQuoteOpen()
						.text("\n\nblockquote line 1")
					.blockQuoteClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing blockquote with one line",function() {
		it("Should match expected",function(done){
			var testFixture = "blockquoteWithOneLine.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.blockQuoteOpen()
						.text("blockquote line 1")
					.blockQuoteClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing blockquote with text containing newlines",function() {
		it("Should match expected",function(done){
			var testFixture = "blockquoteContainingNewlines.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.blockQuoteOpen()
						.text("blockquote line 1\nblockquote line 2\n\nblockquote line 4")
					.blockQuoteClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing inner blockquotes",function() {
		it("Should match expected",function(done){
			var testFixture = "innerBlockquote.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.blockQuoteOpen()
						.text("blockquote line 1")
						.blockQuoteOpen()
							.text("blockquote inner line 1")
							.blockQuoteOpen()
								.text("\n\nblockquote inner inner line 1")
							.blockQuoteClose()
						.blockQuoteClose()
					.blockQuoteClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
});