var fs = require('fs');
var sax = require('sax');
var tr = require('through');
var should = require('should');
var Readable = require('stream').Readable;
var Hammerdown = require('../../lib/hammerdown');

var stringToStream = function(string){
	var rs = new Readable();
	rs.push(string);
	rs.push(null);
	return rs;
};

describe("When something",function(){
	it("should do something else",function(done){
		// var stream = stringToStream("<body style='color:white'> text</body>");
		//var stream = stringToStream("<h1>Any Header1</h1><h2>Any Header2</h2><h3>Any Header3</h3><h4>Any Header4</h4><h5>Any Header5</h5><h6>Any Header6</h6>");
		//var stream = stringToStream("<ul><li>item3</li><li>item2</li><li>has sub<ul><li>inner 1</li></ul></li></ul><h2>Any Header2</h2><h3>Any Header3</h3><h4>Any Header4</h4><h5>Any Header5</h5><h6>Any Header6</h6>");
		//var stream = stringToStream("<table><tr><th>A header</th></tr><tr><td>a row</td></tr></table>");
		//var stream = stringToStream("<code class='language-javascript'>function(){}</code>");
		//var stream = stringToStream("<code class='language-javascript'>function(){}</code>");
		//var stream = stringToStream("<p>This is a first paragraph,\non multiple lines.</p>\n\n<p></p>\n\n<p>This is a second paragraph.\nThere are spaces in between the two.</p>");
		//var stream = stringToStream("<h1>Any Header1</h1>");
		//var stream = stringToStream("<b><p>Any Header1</p></b>");
		//var stream = stringToStream("<a href='/sample.com'>asdf</a>");
		//var stream = stringToStream("<img src='something.png' alt='some'/>")
		//var stream = stringToStream("<ul><li>Item1</li><li>Item2</li><li>Item3<ul><li><p>inner</p><ul><li>inner inner</li></ul></li></ul></li></ul>");
		// var stream = stringToStream("<blockquote><ol><li>Item1</li><li><p>Item3 aldf<blockquote><ul><li>unorderedItem<ol><li>sub ordered list</li></ol></li></ul></blockquote> </li></ol></blockquote>");
		// var stream = stringToStream("<blockquote><p>before</p></blockquote>");

		//var stream = stringToStream("<ul><li><p>item1</p><blockquote><p>item2</p></blockquote></li></ul>");
		//var stream = stringToStream("<li>Any <p><p>Item1</p>\n\nadsfasd\n</p></li><li><h1>Any Item2</h1>\n\nadsfasd\n</li>");
		//var stream = stringToStream("<li>Any Item1\n\nadsfasd</li><li><h1>Any Item2</h1><li>Inner listItem\n\nasdfsd</li></li>");
		// var stream = stringToStream("<ul><li><p>a list containing a blockquote</p><blockquote><p>this the blockquote in the list</p></blockquote></li></ul>");
		//var stream = stringToStream("<ul><li>item1</li><li><blockquote><p>item1</p></blockquote></li></ul>");
		var stream = stringToStream("<pre><code class='language-javascript'>asdfsdfsadf\nadslfkjasdf\naldkfjasldfj\nalsdfkjasdf<pre><code>adsfsdfas</code></pre></code></pre>");
		var hammerdown = new Hammerdown({type:'gfm'});

		var fileStream = fs.createWriteStream('./test.md');
		stream.pipe(hammerdown)
				.pipe(fileStream);
				//.pipe(process.stdout)


				// hammerdown.on('end',function(){
				// 	done();
				// });
				fileStream.on('close',function(){
					//fixtureUtils.assertActualEqualsExpected(testFixture);
					done();
				});
	});
});