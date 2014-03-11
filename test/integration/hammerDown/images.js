var fs = require('fs');
var should = require('should');
var fixtureUtils = require('./fixtureUtils');
var HammerDown = require('../../../lib/hammerDown');


describe("When using hammerdown to output images",function() {
	var resultDirectory =fixtureUtils.createTestDirectory();

	describe("When outputing images with title",function() {
		it("Should match expected",function(done){
			var testFixture = "imagesWithAlt.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			var imageDefinition = {
				src : '/someSource.png',
				alt : 'A image'
			};
			hammerDown.image(imageDefinition)
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing images with out a title",function() {
		it("Should match expected",function(done){
			var testFixture = "imagesWithOutAlt.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			var imageDefinition = {
				src : '/someSource.png'
			};
			hammerDown.image(imageDefinition)
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing images with a title",function() {
		it("Should match expected",function(done){
			var testFixture = "imagesWithTitle.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			var imageDefinition = {
				src : '/someSource.png',
				alt : 'A image',
				title: "some title"
			};
			hammerDown.image(imageDefinition)
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
});