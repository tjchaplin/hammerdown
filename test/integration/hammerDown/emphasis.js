var fs = require('fs');
var should = require('should');
var fixtureUtils = require('./fixtureUtils');
var HammerDown = require('../../../lib/hammerDown');


describe("When using hammerdown",function() {
	var resultDirectory =fixtureUtils.createTestDirectory();

	describe("When outputing emphasis on a single line",function() {
		it("Should match expected",function(done){
			var testFixture = "emphasis.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.emphasisOpen()
						.text("single asterisks")
						.emphasisClose()
						.text(" ")
						.boldOpen()
						.text("bold text")
						.boldClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
});