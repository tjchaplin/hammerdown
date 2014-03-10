var fs = require('fs');
var should = require('should');
var fixtureUtils = require('./fixtureUtils');
var HammerDown = require('../../../lib/hammerDown');


describe("When using blockquotes",function() {
	var resultDirectory =fixtureUtils.createTestDirectory();

	describe("When blockquotes contain markup",function() {
		describe("When using paragraph markup",function() {
			it("Should match expected",function(done){
				var testFixture = "blockQuoteWithParagraphMarkup.md";
				var resultFile = resultDirectory+"/"+testFixture;
				fileOutput = fs.createWriteStream(resultFile);
				var hammerDown = new HammerDown();

				hammerDown.blockQuoteOpen()
							.text("Text Before")
							.paragraph()
							.paragraph()
							.text("Text After")
							.blockQuoteClose()
							.done();

				var writeStream = hammerDown.readableStream().pipe(fileOutput);
				writeStream.on('close',function(){
					fixtureUtils.assertActualEqualsExpected(testFixture);
					done();
				});			
			});
		});
		describe("When using nested ordered list markup",function() {
			it("Should match expected",function(done){
				var testFixture = "blockquoteWithHeaderMarkerMarkup.md";
				var resultFile = resultDirectory+"/"+testFixture;
				fileOutput = fs.createWriteStream(resultFile);
				var hammerDown = new HammerDown();

				hammerDown.blockQuoteOpen()
							.text("Simple ordered list")
							.headerMarker()
							.blockQuoteClose()
							.done();

				var writeStream = hammerDown.readableStream().pipe(fileOutput);
				writeStream.on('close',function(){
					fixtureUtils.assertActualEqualsExpected(testFixture);
					done();
				});			
			});
		});
		describe("When using nested ordered list markup",function() {
			it("Should match expected",function(done){
				var testFixture = "blockquoteWithNestedOrderedListMarkup.md";
				var resultFile = resultDirectory+"/"+testFixture;
				fileOutput = fs.createWriteStream(resultFile);
				var hammerDown = new HammerDown();

				hammerDown.blockQuoteOpen()
							.text("Simple ordered list")
							.orderedListOpen()
								.listItemOpen()
									.text("ordered-item1")
								.listItemClose()
								.listItemOpen()
									.text("ordered-item2")
								.listItemClose()
								.listItemOpen()
									.text("ordered-item3")
								.listItemClose()
								.listItemOpen()
									.text("ordered-item4")
								.listItemClose()
								.orderedListOpen()
									.listItemOpen()
										.text("ordered-inner-item1")
									.listItemClose()
									.listItemOpen()
										.text("ordered-inner-item2")
									.listItemClose()
									.listItemOpen()
										.text("ordered-inner-item3")
									.listItemClose()
								.orderedListClose()
							.orderedListClose()
							.blockQuoteClose()
							.done();

				var writeStream = hammerDown.readableStream().pipe(fileOutput);
				writeStream.on('close',function(){
					fixtureUtils.assertActualEqualsExpected(testFixture);
					done();
				});			
			});
		});
		describe("When using nested unordered list markup",function() {
			it("Should match expected",function(done){
				var testFixture = "blockquoteWithNestedUnOrderedListMarkup.md";
				var resultFile = resultDirectory+"/"+testFixture;
				fileOutput = fs.createWriteStream(resultFile);
				var hammerDown = new HammerDown();

				hammerDown.blockQuoteOpen()
							.text("Simple unordered list")
							.unOrderedListOpen()
								.listItemOpen()
									.text("unordered-item1")
								.listItemClose()
								.listItemOpen()
									.text("unordered-item2")
								.listItemClose()
								.listItemOpen()
									.text("unordered-item3")
								.listItemClose()
								.listItemOpen()
									.text("unordered-item4")
								.listItemClose()
								.unOrderedListOpen()
									.listItemOpen()
										.text("unordered-inner-item1")
									.listItemClose()
									.listItemOpen()
										.text("unordered-inner-item2")
									.listItemClose()
									.listItemOpen()
										.text("unordered-inner-item3")
									.listItemClose()
								.unOrderedListClose()
							.unOrderedListClose()
							.blockQuoteClose()
							.done();

				var writeStream = hammerDown.readableStream().pipe(fileOutput);
				writeStream.on('close',function(){
					fixtureUtils.assertActualEqualsExpected(testFixture);
					done();
				});			
			});
		});
		describe("When using unordered list markup",function() {
			it("Should match expected",function(done){
				var testFixture = "blockquoteWithUnOrderedListMarkup.md";
				var resultFile = resultDirectory+"/"+testFixture;
				fileOutput = fs.createWriteStream(resultFile);
				var hammerDown = new HammerDown();

				hammerDown.blockQuoteOpen()
							.text("Simple unordered list")
							.unOrderedListOpen()
								.listItemOpen()
									.text("unordered-item1")
								.listItemClose()
								.listItemOpen()
									.text("unordered-item2")
								.listItemClose()
								.listItemOpen()
									.text("unordered-item3")
								.listItemClose()
							.unOrderedListClose()
							.blockQuoteClose()
							.done();

				var writeStream = hammerDown.readableStream().pipe(fileOutput);
				writeStream.on('close',function(){
					fixtureUtils.assertActualEqualsExpected(testFixture);
					done();
				});			
			});
		});

		describe("When using unordered list markup",function() {
			it("Should match expected",function(done){
				var testFixture = "blockquoteWithOrderedListMarkup.md";
				var resultFile = resultDirectory+"/"+testFixture;
				fileOutput = fs.createWriteStream(resultFile);
				var hammerDown = new HammerDown();

				hammerDown.blockQuoteOpen()
							.text("Simple ordered list")
							.orderedListOpen()
								.listItemOpen()
									.text("ordered-item1")
								.listItemClose()
								.listItemOpen()
									.text("ordered-item2")
								.listItemClose()
								.listItemOpen()
									.text("ordered-item3")
								.listItemClose()
							.orderedListClose()
							.blockQuoteClose()
							.done();

				var writeStream = hammerDown.readableStream().pipe(fileOutput);
				writeStream.on('close',function(){
					fixtureUtils.assertActualEqualsExpected(testFixture);
					done();
				});			
			});
		});
		describe("When using header markup",function() {
			it("Should match expected",function(done){
				var testFixture = "blockquoteWithHeaderMarkup.md";
				var resultFile = resultDirectory+"/"+testFixture;
				fileOutput = fs.createWriteStream(resultFile);
				var hammerDown = new HammerDown();

				hammerDown.blockQuoteOpen()
							.headerOpen()
								.text("Header 1")
							.headerClose()
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
	describe("When appending blockquotes on same line",function() {
		it("Should match expected",function(done){
			var testFixture = "blockquoteWithMultilineText.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.blockQuoteOpen()
						.text("blockquote word 1 ")
						.text("blockquote word 2")
					.blockQuoteClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});

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
								.text("\nblockquote inner inner line 1")
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