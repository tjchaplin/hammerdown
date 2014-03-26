var fs = require('fs');
var path = require('path');
var should = require('should');
var fixtureUtils = require('./fixture-utils');
var Hammerdown = require('../../lib/hammerdown');

var forEachTestFixture = function(testDirectory,onTestFixture){
	var testFiles = fs.readdirSync(testDirectory);

	for (var i = 0; i < testFiles.length; i++) {
		var testFile = testFiles[i];
		var isMarkdownFile = testFile.lastIndexOf('.md') >= 0;
		testFile = testFile.substr(0, testFile.lastIndexOf('.')) || testFile;
		if(isMarkdownFile)
			onTestFixture(testFile);
	}
};

describe("When converting html to markdown", function(){
	var resultDirectory =fixtureUtils.createTestDirectory();
	forEachTestFixture(__dirname+'/markdown-testsuite/tests',function(testFixture){
		it("Then should be able to generate the expected markdown for "+testFixture, function(done) {
			var resultFile = resultDirectory+"/"+testFixture+".md";
			var fileOutput = fs.createWriteStream(resultFile);

			var htmlFile = __dirname+"/markdown-testsuite/tests/"+testFixture+".out";
			var htmlStream = fs.createReadStream(htmlFile);

			var hammerdown = new Hammerdown();
			var writeStream = htmlStream.pipe(hammerdown).pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});
		});
	});
});

// describe("When converting html to markdown", function(){
// 	it("Then should be able to generate the expected markdown for all source files", function(done) {

// 			forEachTestFixture(function(testFixtureFileName){
// 				var sourceFile = __dirname+"/fixtures/"+testFixtureFileName+".html";
// 				var expectedFile = __dirname+"/expected/"+testFixtureFileName+".md";

// 				var source = fs.readFileSync(sourceFile, 'ascii');
// 				var expected = fs.readFileSync(expectedFile, 'ascii');
// 				var resultOutput = md(source);
// 				var outputFile = __dirname+"/tmp/"+testFixtureFileName+".md";
// 				fs.writeFileSync(outputFile,resultOutput,'ascii');
// 				resultOutput.should.be.eql(expected);				
// 			});
// 			done();
// 	});
// });