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

var isIgnored = function(ignoredTests, test){
	for (var i = 0; i < ignoredTests.length; i++) {
		if(ignoredTests[i] == test)
			return true;
	}	
	return false;
}
describe("When converting html to github flavored markdown", function(){
	var resultDirectory =fixtureUtils.createTestDirectory();
	var githubFlavoredMarkdownIgnoredTests = [
	'code-4-spaces-escaping',
	'code-4-spaces',
	'list-code'
	]
	forEachTestFixture(__dirname+'/markdown-testsuite/tests',function(testFixture){
		if(isIgnored(githubFlavoredMarkdownIgnoredTests,testFixture))
			return;

		it("Then should be able to generate the expected markdown for "+testFixture, function(done) {
			var resultFile = resultDirectory+"/"+testFixture+".md";
			var fileOutput = fs.createWriteStream(resultFile);

			var htmlFile = __dirname+"/markdown-testsuite/tests/"+testFixture+".out";
			var htmlStream = fs.createReadStream(htmlFile);

			var hammerdown = new Hammerdown({type:'gfm'});
			var writeStream = htmlStream.pipe(hammerdown).pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});
		});
	});
});

describe("When converting html to github flavored markdown", function(){
	var resultDirectory =fixtureUtils.createTestDirectory();

	forEachTestFixture(__dirname+'/markdown-testsuite/tests/extensions/gfm',function(testFixture){

		it("Then should be able to generate the expected markdown for "+testFixture, function(done) {
			var resultFile = resultDirectory+"/"+testFixture+".md";
			var fileOutput = fs.createWriteStream(resultFile);

			var htmlFile = __dirname+'/markdown-testsuite/tests/extensions/gfm/'+testFixture+".out";
			var htmlStream = fs.createReadStream(htmlFile);

			var hammerdown = new Hammerdown({type:'gfm'});
			var writeStream = htmlStream.pipe(hammerdown).pipe(fileOutput);
			writeStream.on('close',function(){
				var actualFile =  __dirname+"/markdown-testsuite-actual/"+testFixture+".md";
				var expectedFile =  __dirname+"/markdown-testsuite/tests/extensions/gfm/"+testFixture+".md";

				var actualData = fs.readFileSync(actualFile, 'utf8').replace(/\r\n/g,'\n');
				var expectedData = fs.readFileSync(expectedFile, 'utf8').replace(/\r\n/g,'\n');
				actualData.should.be.eql(expectedData);
				done();
			});
		});
	});
});