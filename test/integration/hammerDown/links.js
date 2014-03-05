var fs = require('fs');
var should = require('should');
var fixtureUtils = require('./fixtureUtils');
var HammerDown = require('../../../lib/hammerDown');


describe("When using hammerdown to add links",function() {
	var resultDirectory =fixtureUtils.createTestDirectory();

	describe("When outputing link without url",function() {
		it("Should match expected",function(done){
			var testFixture = "linkWithOutUrl.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			var linkDefinition = {};
			hammerDown.linkOpen(linkDefinition)
						.text("link")
						.linkClose()
						.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing link with url",function() {
		it("Should match expected",function(done){
			var testFixture = "linkWithUrl.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			var linkDefinition = {
				href : '/someUrl'
			};
			hammerDown.linkOpen(linkDefinition)
						.text("link")
						.linkClose()
						.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing link with url and title",function() {
		it("Should match expected",function(done){
			var testFixture = "linkWithUrlAndTitle.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			var linkDefinition = {
				href : '/someUrl',
				title : 'someUrlTitle'
			};
			hammerDown.linkOpen(linkDefinition)
						.text("link")
						.linkClose()
						.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing reference link with url",function() {
		it("Should match expected",function(done){
			var testFixture = "linkWithReference.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var options = {
				referenceLinks : true
			};
			var hammerDown = new HammerDown(options);

			var linkDefinition = {
				href : '/someUrl'
			};
			hammerDown.linkOpen(linkDefinition)
						.text("link")
						.linkClose()
						.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing reference link with url",function() {
		it("Should match expected",function(done){
			var testFixture = "linkWithMultipleReferences.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var options = {
				referenceLinks : true
			};
			var hammerDown = new HammerDown(options);

			var linkDefinition1 = {
				href : '/someUrl'
			};
			var linkDefinition2 = {
				href : '/someUrl'
			};
			hammerDown.linkOpen(linkDefinition1)
						.text("link1")
						.linkClose()
						.linkOpen(linkDefinition2)
						.text("link2")
						.linkClose()
						.linkOpen(linkDefinition1)
						.text("link1")
						.linkClose()
						.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	
});