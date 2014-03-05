var fs = require('fs');
var should = require('should');
var fixtureUtils = require('./fixtureUtils');
var HammerDown = require('../../../lib/hammerDown');


describe("When using hammerdown",function() {
	var resultDirectory =fixtureUtils.createTestDirectory();

	describe("When outputing headers",function() {
		it("Should match expected",function(done){
			var testFixture = "headers.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.headerOpen(1)
					.text("Header1")
					.headerClose()
					.headerOpen(2)
					.text("Header2")
					.headerClose()
					.headerOpen(3)
					.text("Header3")
					.headerClose()
					.headerOpen(4)
					.text("Header4")
					.headerClose()
					.headerOpen(5)
					.text("Header5")
					.headerClose()
					.headerOpen(6)
					.text("Header6")
					.headerClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
});