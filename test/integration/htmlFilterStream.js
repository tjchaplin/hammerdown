var should = require('should');
var concat = require('concat-stream');
var Readable = require('stream').Readable;
var HtmlFilterStream = require('../../lib/htmlFilterStream');

var stringToStream = function(string){
	var rs = new Readable();
	rs.push(string);
	rs.push(null);
	return rs;
};

describe("When using html filter",function(){
	describe("When filtering visible elements",function(){
		describe("When contains visible elements",function(){
			var htmlFilterStream = new HtmlFilterStream();

			var stream = stringToStream("<div><h1>child1</h1><p><span>child2</span>Some Item</div>");

			it("Should stream elements",function(done){
				stream.pipe(htmlFilterStream).pipe(concat(function(data){
					data.toString().should.be.eql('<div><h1>child1</h1><p><span>child2</span>Some Item</div>');
					done();
				}));
			});
		});
		describe("When contains non visible elements with children",function(){
			var htmlFilterStream = new HtmlFilterStream();

			var stream = stringToStream("<div style='display:none'><h1>child1</h1><p><span>child2</span>Some Item</div>");

			it("Should not stream children",function(done){
				stream.pipe(htmlFilterStream).pipe(concat(function(data){
					data.toString().should.be.eql('');
					done();
				}));
			});
		});
		describe("When contains elements that are visible and not visible",function(){
			var htmlFilterStream = new HtmlFilterStream();

			var stream = stringToStream("<h1>visible</h1><div style='display:none'>Some Item</div>");

			it("Should stream visible elements",function(done){
				stream.pipe(htmlFilterStream).pipe(concat(function(data){
					data.toString().should.be.eql('<h1>visible</h1>');
					done();
				}));
			});
		});
		describe("When element display is none",function(){
			var htmlFilterStream = new HtmlFilterStream();

			var stream = stringToStream("<div style='display:none'>Some Item</div>");

			it("Tag Should not be in stream",function(done){
				stream.pipe(htmlFilterStream).pipe(concat(function(data){
					data.toString().should.be.eql('');
					done();
				}));
			});
		});
		describe("When element visibility is hidden",function(){
			var htmlFilterStream = new HtmlFilterStream();

			var stream = stringToStream("<div style='visibility:hidden'>Some Item</div>");

			it("Tag Should not be in stream",function(done){
				stream.pipe(htmlFilterStream).pipe(concat(function(data){
					data.toString().should.be.eql('');
					done();
				}));
			});
		});
	});
});