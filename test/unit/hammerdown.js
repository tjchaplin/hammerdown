var assert = require('assert');
var concat = require('concat-stream');
var hammerdown = require('../../lib/hammerdown');

describe('When using hammerdown with a string',function(){
	it('should produce expected markdown',function(){
		hammerdown().parse('<h1>Header</h1>').pipe(concat(function(data){
			assert(data == '# Header');
		}));
	})
});
