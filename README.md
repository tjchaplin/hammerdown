hammerdown
==========

[![Build Status](https://travis-ci.org/tjchaplin/hammerdown.png?branch=master)](https://travis-ci.org/tjchaplin/hammerdown)

Streaming html to markdown writer

# Get Started

## Simple Example

```javascript
var hammerdown = require("hammerdown");

//Write markdown
hammerdown().parse("<h1>A Markdown Header</h1><p>Some text <b>bold text</b></p>").pipe(process.stdout);

//Outputs
//	# A Markdown Header
//
//	Some text **bold text**
```

## Github Flavored Markdown Example

```javascript
var hammerdown = require("hammerdown");

//Write markdown
var htmlString = "<pre>" +
					"<code class='language-javascript'>"+
						"var awesomeoFunction = function(){"+
							"return true;"+
						"}"+
					"</code>"+
				"</pre>";
hammerdown({type:"gfm"}).parse(htmlString).pipe(process.stdout);

//Outputs
//  ```javascript
//	function myFunction(params){return true;};
//	```
```

## Simple Example using file stream

```javascript
var fs = require('fs');
var hammerdown = require('hammerdown');

var htmlFileStream = fs.createReadStream("anyHtmlFile.html");

//Output markdown
htmlFileStream.pipe(hammerdown()).pipe(process.stdout);

//Outputs
//  # Any header	
//  
//  Any **Content**
```

```
<!-- anyHtmlFile.html-->
<!doctype html>
<html>
<head>
	<title>Any Title</title>
</head>
<body>
	<h1>Any header</h1>
	<p>Any <b>Content</b></p>
</body>
</html>
```

# Install

```
npm install hammerdown
```

# Purpose 

Existing html to markdown writers didn't:
* Support windows *easily*([html.md](https://github.com/neocotic/html.md)
* Lack of support for github flavored markdown ([to-markdown](https://github.com/domchristie/to-markdown))
* Didn't support streams 

## Whey convert html to markdown?

To have an easy way to programatically generate a stream of markdown text from html.  This library includes a converters for standard markdown and it also includes [Github-Flavored-Markdown](https://help.github.com/articles/github-flavored-markdown) definitions.  Some of the other libraries that exist, don't provide full features for github-flavored-markdown, and didn't produce streams.

Markdown is a mechanism to create documents. [See](http://daringfireball.net/projects/markdown/) for more details.  Hammerdown allows developers to leverage the simplicity of Markdown from html text.

# Gulp Plugin!

For adding to your build process checkout [gulp-hammerdown](https://github.com/tjchaplin/gulp-hammerdown)

# Options

Hammerdown currently accepts one option: `type`.  If `type` is `"gfm"` then hammerdown will produce markdown using github flavored markdown(gfm).

# Examples

Below is a select group of examples.  More examples can be found by looking at the integration tests.

# Github Flavored Markdown Examples

## Tables
```javascript
var fs = require('fs')
var hammerdown = require('hammerdown');

var htmlFileStream = fs.createReadStream("anyTable.html");

//Output markdown
htmlFileStream.pipe(hammerdown({type:"gfm"})).pipe(process.stdout);

//Outputs
//  |Header1|Header1|
//  |---|---|
//  |row1-col1|row1-col2|
//  |row2-col1|row2-col2|
```

```html
<!-- anyTable.html -->
<!doctype html>
<html>
	<head>
		<title>Table Html</title>
	</head>
	<body>
		<table>
			<tr>
				<th>
					Header1
				</th>
				<th>
					Header1
				</th>
			</tr>
			<tr>
				<td>
					row1-col1
				</td>
				<td>
					row1-col2
				</td>
			</tr>
			<tr>
				<td>
					row2-col1
				</td>
				<td>
					row2-col2
				</td>
			</tr>
		</table>
	</body>
</html>
```

## Fenced Code Block
```javascript
var fs = require('fs')
var hammerdown = require('hammerdown');

var htmlFileStream = fs.createReadStream("anyTable.html");

//Output markdown
htmlFileStream.pipe(hammerdown({type:"gfm"})).pipe(process.stdout);

//Outputs
//  ```javascript
//  var awesomeoFunction = function(){
//				return true;
//	};
//  ```
```

```html
<!-- anyFencedCodeBlock.html -->
<!doctype html>
<html>
	<head>
		<title>Fenced Code Block</title>
	</head>
	<body>
		<pre>
		<code class='language-javascript'>
			var awesomeoFunction = function(){
				return true;
			};
		</code>
		</pre>
	</body>
</html>
```

# Credits

* Thanks to [karlcows Markdown Test Runner](https://github.com/karlcow/markdown-testsuite) I was able to provide a solid set of tests
