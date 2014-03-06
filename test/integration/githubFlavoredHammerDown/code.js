var fs = require('fs');
var should = require('should');
var fixtureUtils = require('./fixtureUtils');
var HammerDown = require('../../../lib/githubFlavoredHammerDown');


describe("When using hammerdown",function() {
	var resultDirectory =fixtureUtils.createTestDirectory();

	describe("When outputing code",function() {
		it("Should match expected",function(done){
			var testFixture = "code.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.codeOpen()
						.text("someCode")
						.codeClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When in code block",function() {
		describe("When outputing code",function() {
			it("Should output fenced code block",function(done){
				var testFixture = "fencedCodeBlock.md";
				var resultFile = resultDirectory+"/"+testFixture;
				fileOutput = fs.createWriteStream(resultFile);
				var hammerDown = new HammerDown();

				hammerDown.blockCodeOpen()
								.codeOpen()
								.text("function myFunction(params){\n\treturn true;\n};\n")
								.codeClose()
							.blockCodeClose()
						.done();

				var writeStream = hammerDown.readableStream().pipe(fileOutput);
				writeStream.on('close',function(){
					fixtureUtils.assertActualEqualsExpected(testFixture);
					done();
				});			
			});
		});
		describe("When outputing code with language",function() {
			it("Should output fenced code block",function(done){
				var testFixture = "fencedCodeBlockWithLanguage.md";
				var resultFile = resultDirectory+"/"+testFixture;
				fileOutput = fs.createWriteStream(resultFile);
				var hammerDown = new HammerDown();

				hammerDown.blockCodeOpen()
								.codeOpen("javascript")
								.text("function myFunction(params){\n\treturn true;\n};\n")
								.codeClose()
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
});