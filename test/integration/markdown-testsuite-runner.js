var fs = require('fs');
var path = require('path');
var should = require('should');
var fixtureUtils = require('./fixture-utils');
var HtmlConverterStream = require('../../lib/htmlConverterStream');

var ignoredTests = [
"2-paragraphs-hard-return-spaces",
"2-paragraphs-line-returns",
"2-paragraphs-line-spaces",
"2-paragraphs-line-tab",
"blockquote-multiline",
"blockquote-line-2-paragraphs",
"blockquote-nested-multiplereturn-level1", //TODO: get this right
"blockquote-nested", //TODO: remove preformatting in blockquote
"blockquote-nested-return-level1",
"em-underscore",
"EOL-CR+LF",
"EOL-CR",
"EOL-LF",
"header-level1-equal-underlined",
"header-level1-hash-sign-closed",
"header-level1-hash-sign-trailing-1-space",
"header-level1-hash-sign-trailing-2-spaces",
"header-level2-dash-underlined",
"header-level2-hash-sign-closed",
"header-level2-hash-sign-trailing-1-space",
"header-level2-hash-sign-trailing-2-spaces",
"header-level3-hash-sign-closed",
"header-level3-hash-sign-trailing-1-space",
"header-level3-hash-sign-trailing-2-spaces",
"header-level4-hash-sign-closed",
"header-level4-hash-sign-trailing-1-space",
"header-level4-hash-sign-trailing-2-spaces",
"header-level5-hash-sign-closed",
"header-level5-hash-sign-trailing-1-space",
"header-level5-hash-sign-trailing-2-spaces",
"header-level6-hash-sign-closed",
"header-level6-hash-sign-trailing-1-space",
"header-level6-hash-sign-trailing-2-spaces",
"horizontal-rule-3-dashes-spaces",
"horizontal-rule-3-stars",
"horizontal-rule-3-underscores",
"horizontal-rule-7-dashes",
"img-idref-title", //TODO: support idreferences
"img-idref", //TODO: support idreferences
"inline-code-with-visible-backtick", //Do Not support this
"inline-code",
"line-break-5-spaces",
"link-automatic",
"link-idref-angle-bracket",
"link-idref-implicit-spaces",
"link-idref-implicit",
"link-idref-space",
"link-idref-title-next-line",
"link-idref-title-paranthesis",
"link-idref-title-single-quote",
"link-idref-title-single-quote",
"list-blockquote", //TODO: remove preformatting in blockquote and list
"list-code"//TODO: remove preformatting in blockquote and list
]

var forEachTestFixture = function(onTestFixture){
	var testFiles = fs.readdirSync(__dirname+'/fixtures');

	for (var i = 0; i < testFiles.length; i++) {
		var testFile = testFiles[i];
		testFile = testFile.substr(0, testFile.lastIndexOf('.')) || testFile;

		onTestFixture(testFile);
	}
};

describe("When converting html to markdown", function(){
	var resultDirectory =fixtureUtils.createTestDirectory();
	it("Then should be able to generate the expected markdown for all source files", function(done) {
		// var toMarkdown = require('to-markdown').toMarkdown;
		// console.log(toMarkdown('<p>This is a first paragraph,\non multiple lines.</p>\n\n<p></p>\n\n<p>This is a second paragraph.\nThere are spaces in between the two.</p>'));
		//var toMarkdown = require('to-markdown').toMarkdown;
		// console.log(toMarkdown('<blockquote>\n<h1>heading level 1</h1>\n\n<p>paragraph</p>\n</blockquote>'));
		// console.log(toMarkdown('<blockquote>\n<h1>heading level 1</h1>Sometext<p>paragraph</p>\n</blockquote>'));
		// console.log(toMarkdown('<blockquote>\n<h1>heading level 1</h1><p>ddd</p><p>paragraph</p></blockquote>'));
		//console.log(toMarkdown('<blockquote>\n<p>paragraph</p><blockquote><p>Other paragraph</p></blockquote></blockquote>'));
		//console.log(toMarkdown('<p>A single backtick in a code span: <code>`</code></p>'));
		var testFixture = "list-multiparagraphs-tab";

//"link-idref-space"
		var resultFile = resultDirectory+"/"+testFixture+".md";
		var fileOutput = fs.createWriteStream(resultFile);

		var htmlFile = __dirname+"/markdown-testsuite/tests/"+testFixture+".out";
		var htmlStream = fs.createReadStream(htmlFile);

		var htmlConverterStream = new HtmlConverterStream({referenceLinks:false});
		var writeStream = htmlStream.pipe(htmlConverterStream).pipe(fileOutput);
		writeStream.on('close',function(){
			fixtureUtils.assertActualEqualsExpected(testFixture);
			done();
		});
	});
});
// var referenceLinkTests = [
// "link-idref-title",
// "link-idref"
// ]
// describe("When converting html to markdown", function(){
// 	var resultDirectory =fixtureUtils.createTestDirectory();
// 	it("Then should be able to generate the expected markdown for all source files", function(done) {
// 		// var toMarkdown = require('to-markdown').toMarkdown;
// 		// console.log(toMarkdown('<p>This is a first paragraph,\non multiple lines.</p>\n\n<p></p>\n\n<p>This is a second paragraph.\nThere are spaces in between the two.</p>'));
// 		//var toMarkdown = require('to-markdown').toMarkdown;
// 		// console.log(toMarkdown('<blockquote>\n<h1>heading level 1</h1>\n\n<p>paragraph</p>\n</blockquote>'));
// 		// console.log(toMarkdown('<blockquote>\n<h1>heading level 1</h1>Sometext<p>paragraph</p>\n</blockquote>'));
// 		// console.log(toMarkdown('<blockquote>\n<h1>heading level 1</h1><p>ddd</p><p>paragraph</p></blockquote>'));
// 		//console.log(toMarkdown('<blockquote>\n<p>paragraph</p><blockquote><p>Other paragraph</p></blockquote></blockquote>'));
// 		//console.log(toMarkdown('<p>A single backtick in a code span: <code>`</code></p>'));
// 		var testFixture = "link-idref-title";
// 		var resultFile = resultDirectory+"/"+testFixture+".md";
// 		var fileOutput = fs.createWriteStream(resultFile);

// 		var htmlFile = __dirname+"/markdown-testsuite/tests/"+testFixture+".out";
// 		var htmlStream = fs.createReadStream(htmlFile);

// 		var htmlConverterStream = new HtmlConverterStream({referenceLinks:true});
// 		var writeStream = htmlStream.pipe(htmlConverterStream).pipe(fileOutput);
// 		writeStream.on('close',function(){
// 			fixtureUtils.assertActualEqualsExpected(testFixture);
// 			done();
// 		});
// 	});
// });

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