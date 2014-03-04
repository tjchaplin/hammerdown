var fs = require('fs');
var should = require('should');
var fixtureUtils = require('./fixtureUtils');
var HammerDown = require('../../lib/hammerDown');


describe("When using hammerdown",function() {
	var resultDirectory =fixtureUtils.createTestDirectory();

	describe("When outputing ordered list",function() {
		it("Should match expected",function(done){
			var testFixture = "orderedList.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown
					.text('Simple ordered list')
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
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing unordered list",function() {
		it("Should match expected",function(done){
			var testFixture = "unorderedlist.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown
					.text('Simple unordered list')
					.listOpen()
					.listItemOpen()
					.text("unordered-item1")
					.listItemClose()
					.listItemOpen()
					.text("unordered-item2")
					.listItemClose()
					.listItemOpen()
					.text("unordered-item3")
					.listItemClose()
					.listClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing nested ordered list",function() {
		it("Should match expected",function(done){
			var testFixture = "nestedOrderedList.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown
					.text('Nested ordered list')
					.orderedListOpen()
						.listItemOpen()
							.text("ordered-item1")
						.listItemClose()
						.listItemOpen()
							.text("ordered-item2")
								.orderedListOpen()
									.listItemOpen()
										.text("ordered-sub-item1")
									.listItemClose()
									.listItemOpen()
										.text("ordered-sub-item2")
									.listItemClose()
									.listItemOpen()
										.text("ordered-sub-item3")
									.listItemClose()
								.orderedListClose()
						.listItemClose()
						.listItemOpen()
							.text("ordered-item3")
						.listItemClose()
					.orderedListClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing nested unordered list",function() {
		it("Should match expected",function(done){
			var testFixture = "nestedUnorderedList.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown
					.text('Nested unordered list')
					.listOpen()
						.listItemOpen()
							.text("unordered-item1")
						.listItemClose()
						.listItemOpen()
							.text("unordered-item2")
								.listOpen()
									.listItemOpen()
										.text("unordered-sub-item1")
									.listItemClose()
									.listItemOpen()
										.text("unordered-sub-item2")
									.listItemClose()
									.listItemOpen()
										.text("unordered-sub-item3")
									.listItemClose()
								.listClose()
						.listItemClose()
						.listItemOpen()
							.text("unordered-item3")
						.listItemClose()
					.listClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing mixed nested unordered list 1",function() {
		it("Should match expected",function(done){
			var testFixture = "mixedNestedList1.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown
					.text('Mixed nested list 1')
					.listOpen()
						.listItemOpen()
							.text("unordered-item1")
						.listItemClose()
						.listItemOpen()
							.text("unordered-item2")
								.orderedListOpen()
									.listItemOpen()
										.text("ordered-sub-item1")
									.listItemClose()
									.listItemOpen()
										.text("ordered-sub-item2")
									.listItemClose()
									.listItemOpen()
										.text("ordered-sub-item3")
									.listItemClose()
								.orderedListClose()
						.listItemClose()
						.listItemOpen()
							.text("unordered-item3")
						.listItemClose()
					.listClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
	describe("When outputing mixed nested unordered list 2",function() {
		it("Should match expected",function(done){
			var testFixture = "mixedNestedList2.md";
			var resultFile = resultDirectory+"/"+testFixture;
			fileOutput = fs.createWriteStream(resultFile);
			var hammerDown = new HammerDown();

			hammerDown
					.text('Mixed nested list 2')
					.orderedListOpen()
						.listItemOpen()
							.text("ordered-item1")
						.listItemClose()
						.listItemOpen()
							.text("ordered-item2")
								.unOrderedListOpen()
									.listItemOpen()
										.text("unordered-sub-item1")
									.listItemClose()
									.listItemOpen()
										.text("unordered-sub-item2")
									.listItemClose()
									.listItemOpen()
										.text("unordered-sub-item3")
									.listItemClose()
								.unOrderedListClose()
						.listItemClose()
						.listItemOpen()
							.text("ordered-item3")
						.listItemClose()
					.orderedListClose()
					.done();

			var writeStream = hammerDown.readableStream().pipe(fileOutput);
			writeStream.on('close',function(){
				fixtureUtils.assertActualEqualsExpected(testFixture);
				done();
			});			
		});
	});
});