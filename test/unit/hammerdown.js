var assert = require('assert');
var concat = require('concat-stream');
var hammerdown = require('../../lib/hammerdown');

describe('When using hammerdown with a string',function(){
	describe('When using as a stream',function(){
		it('should produce expected markdown',function(done){
			hammerdown().parse('<h1>Header</h1>').pipe(concat(function(data){
				assert(data == '# Header');
				done();
			}));
		});
	});
	describe('When using with a callback',function(){
		it('should produce expected markdown',function(done){
			hammerdown().parse('<h1>Header</h1>',function(error,data){
				assert(data == '# Header');
				done();
			});
		});
	});
});