var sinon = require('sinon');
var HammerDown = require('../../../lib/hammerDown');

describe("When wrting markdown",function() {
	var hammerDown;
	var hammerDownStream;

	beforeEach(function(){
		hammerDown = new HammerDown();

		hammerDownStream = hammerDown.readableStream();
		sinon.spy(hammerDownStream,'append');
		sinon.spy(hammerDownStream,'appendRaw');
		sinon.spy(hammerDownStream,'appendFormatted');
	});

	describe("When appending link",function() {		
		describe("When appending an open link",function() {		
			it("Should append start bracket",function(){
				hammerDown.linkOpen();
				var expected = '[';

				var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
		describe("When appending a close link",function() {
			describe("When not referenceLinks url",function() {
				it("Should append link reference",function(){
					var linkDefinition = {
						href : '/somelink',
						title : 'someTitle'
					};
					hammerDown.linkClose(linkDefinition);
					var expected = '](/somelink \"someTitle\")';

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
			describe("When referenceLinks url",function() {
				it("Should append link reference",function(){
					var linkDefinition = {
						href : '/somelink',
						title : 'someTitle'
					};
					hammerDown.options.referenceLinks = true;
					hammerDown.linkClose(linkDefinition);
					var expected = '][0]';

					var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
					appended.should.be.eql(expected);
				});
			});
		});
	});
	describe("When appending link references",function() {
		describe("When has link references",function() {
			it("Should append references",function(){
				hammerDown.links = ['/link1','/link2'];
				hammerDown.linkReferences();
				var expected = '\n\n[0]: /link1\n[1]: /link2\n';

				var appended = hammerDownStream.appendFormatted.getCall(0).args[0];
				appended.should.be.eql(expected);
			});
		});
	});
});