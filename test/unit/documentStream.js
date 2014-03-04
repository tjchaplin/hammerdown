var should = require('should');
var concat = require('concat-stream');
var DocumentStream = require('../../lib/documentStream');

describe("When using a markdown document",function(){

	describe("When reading from the document stream",function(){
		var documentStream;
		beforeEach(function(){
			documentStream = new DocumentStream();
		});

		describe("When entire document has been pushed into stream",function(){
			it("Should be able to read all data that has been pushed",function(done){
				documentStream.append("anyString").done();
				documentStream.pipe(concat(function(data){
					data.toString().should.be.eql('anyString');
					done();
				}));
			});
		});
		describe("When part of document has been pushed into stream",function(){
			it("Should be able to read all data",function(done){
				documentStream.append("beforePipe");
				documentStream.pipe(concat(function(data){
					data.toString().should.be.eql('beforePipe\nafterPipe');
					done();
				}));
				documentStream.append("\nafterPipe").done();
			});
		});
	});
	describe("When updating document position",function(){
		var documentStream;
		beforeEach(function(){
			documentStream = new DocumentStream();
		});
		describe("When data ends in a newline",function(){
			
			it("Should mark document position as at newline",function(){
				documentStream.updateDocumentPostion("data\n");
				documentStream.atNewline.should.be.equal(true);
			});

			it("Should not mark document position as at word end",function(){
				documentStream.updateDocumentPostion("data\n");
				documentStream.atWordEnd.should.be.equal(true);
			});
			it("Should not mark document position as at paragraph end",function(){
				documentStream.updateDocumentPostion("data\n");
				documentStream.atParagraphEnd.should.be.equal(false);
			});
		});
		describe("When data ends in a two newline",function(){
			it("Should mark document position as at paragraph end",function(){
				documentStream.updateDocumentPostion("data\n\n");
				documentStream.atParagraphEnd.should.be.equal(true);
			});
		});
		describe("When data ends in space",function(){
			it("Should mark document position as at word end",function(){
				documentStream.updateDocumentPostion("data ");
				documentStream.atWordEnd.should.be.equal(true);
			});
		});
		describe("When data ends in tab",function(){
			it("Should mark document position as at word end",function(){
				documentStream.updateDocumentPostion("data\t");
				documentStream.atWordEnd.should.be.equal(true);
			});
		});
		describe("When data doesn't end in a space, tab, or newline",function(){
			it("Should not mark document position as at word end",function(){
				documentStream.updateDocumentPostion("data");
				documentStream.atWordEnd.should.be.equal(false);
			});
			it("Should not mark document position as at newline",function(){
				documentStream.updateDocumentPostion("data");
				documentStream.atNewline.should.be.equal(false);
			});
			it("Should not mark document position as at paragraph end",function(){
				documentStream.updateDocumentPostion("data");
				documentStream.atParagraphEnd.should.be.equal(false);
			});
		});
	});
	describe("When appending data",function(){
		describe("When document data start has tabs or spaces",function(){
			var documentStream;
			beforeEach(function(){
				documentStream = new DocumentStream();
			});

			describe("When document data starts with a space",function(){
				var formattedData = " formatted text";
				var expected = " formatted text";
				it("Should leave space",function(){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
					}));
				});
			});
			describe("When document data starts with multiple spaces",function(){
				var formattedData = "      formatted text";
				var expected = " formatted text";
				it("Should replace with single space",function(){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
					}));
				});
			});
			describe("When document data starts with a tab",function(){
				var formattedData = "\tformatted text";
				var expected = " formatted text";
				it("Should replace with single space",function(){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
					}));
				});
			});
			describe("When document data starts with multiple tabs",function(){
				var formattedData = "\t\t\t\t\tformatted text";
				var expected = " formatted text";
				it("Should replace with single space",function(){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
					}));
				});
			});
			describe("When document data starts with a mix of tabs and spaces",function(){
				var formattedData = " \t  \t\t\t  \tformatted text";
				var expected = " formatted text";
				it("Should replace with single space",function(){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
					}));
				});
			});
		});
		describe("When document data start has a newline",function(){
			var documentStream;
			beforeEach(function(){
				documentStream = new DocumentStream();
			});

			describe("When document data starts with a space followed by newline",function(){
				var formattedData = " \nformatted text";
				var expected = "\nformatted text";
				it("Should remove space",function(){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
					}));
				});
			});
			describe("When document data starts with a tab followed by newline",function(){
				var formattedData = " \t\nformatted text";
				var expected = "\nformatted text";
				it("Should remove tab",function(){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
					}));
				});
			});
			describe("When document data starts with a mix of tab and spaces followed by a newline",function(){
				var formattedData = "\t  \t \t \nformatted text";
				var expected = "\nformatted text";
				it("Should remove spaces and tabs",function(){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
					}));
				});
			});
		});
		describe("When document position is at an end separator",function(){
			var documentStream;
			beforeEach(function(){
				documentStream = new DocumentStream();
				documentStream.atWordEnd = true;
			});
			
			describe("When data starts with space",function(){
				var formattedData = " Formatted Data";
				var expected = "Formatted Data";
				it("Should remove them from data",function(done){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
						done();
					}));
				});
			});

			describe("When data starts with tab",function(){
				var formattedData = "\tFormatted Data";
				var expected = "Formatted Data";
				it("Should remove them from data",function(done){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
						done();
					}));
				});
			});
			describe("When data starts with newline",function(){
				var formattedData = "\nFormatted Data";
				var expected = "Formatted Data";
				it("Should remove them from data",function(done){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
						done();
					}));
				});
			});
			describe("When data starts with space, tab and newline",function(){
				var formattedData = " \t\nFormatted Data";
				var expected = "Formatted Data";
				it("Should remove them from data",function(done){
					documentStream.append(formattedData).done();
					documentStream.pipe(concat(function(data){
						data.toString().should.eql(expected);
						done();
					}));
				});
			});
		});
	});
});