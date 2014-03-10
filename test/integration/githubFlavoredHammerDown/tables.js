var fs = require('fs');
var should = require('should');
var fixtureUtils = require('./fixtureUtils');
var HammerDown = require('../../../lib/githubFlavoredHammerDown');


describe("When using hammerdown",function() {
	var resultDirectory =fixtureUtils.createTestDirectory();

	describe("When outputing tables",function() {
		it("Should match expected",function(done){
			var testFixture = "table.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown.text("Text before table")
						.tableOpen()
							.tableRowOpen()
							.tableHeaderOpen()
								.text("header1")
							.tableHeaderClose()
							.tableHeaderOpen()
								.text("header2")
							.tableHeaderClose()
							.tableHeaderOpen()
								.text("header3")
							.tableHeaderClose()
						.tableRowClose()
						.tableRowOpen()
							.tableDataOpen()
								.text("row1-col1")
							.tableDataClose()
							.tableDataOpen()
								.text("row1-col2")
							.tableDataClose()
							.tableDataOpen()
								.text("row1-col3")
							.tableDataClose()
						.tableRowClose()
						.tableRowOpen()
							.tableDataOpen()
								.text("row2-col1")
							.tableDataClose()
							.tableDataOpen()
								.text("row2-col2")
							.tableDataClose()
							.tableDataOpen()
								.text("row2-col3")
							.tableDataClose()
						.tableRowClose()
						.tableRowOpen()
							.tableDataOpen()
								.text("row3-col1")
							.tableDataClose()
							.tableDataOpen()
								.text("row3-col2")
							.tableDataClose()
							.tableDataOpen()
								.text("row3-col3")
							.tableDataClose()
						.tableRowClose()
						.tableClose()
						.text("Text after table")
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
});