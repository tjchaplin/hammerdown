hammerdown
==========

[![Build Status](https://travis-ci.org/tjchaplin/hammerdown.png?branch=master)](https://travis-ci.org/tjchaplin/hammerdown)

Streaming markdown writer

# Get Started

## Simple Example

```javascript
var hammerdown = require("hammerdown");

//Write markdown
hammerDown.headerOpen(1)
			.text("A Markdown Header")
		  .headerClose()
		  .text("Some text ").boldOpen().text("bold text").blodClose()
		  .done();

hammerDown.readableStream().pipe(process.stdout);

//Outputs
//	# A Markdown Header
//
//	Some text **bold text**
```

## Github Flavored Markdown Example

```javascript
var hammerdown = require("hammerdown").githubFlavoredHammerDown;

//Write markdown
hammerDown.blockCodeOpen()
				.codeOpen("javascript")
				.text("function myFunction(params){\n\treturn true;\n};\n")
				.codeClose()
			.blockCodeClose()
		.done();

hammerDown.readableStream().pipe(process.stdout);

//Outputs
//	```javascript
//	function myFunction(params){
//		return true;
//	};
//	```
```

# Install

```
npm install hammerdown
```

# Purpose 

To have an easy way to programatically generate a stream of markdown text.  This library includes a complete set of Markdown attributes to generate Markdown document streams. It also includes the definitions used to produce [Github-Flavored-Markdown](https://help.github.com/articles/github-flavored-markdown).

Markdown is a mechanism to create documents. [See](http://daringfireball.net/projects/markdown/) for more details.  Hammerdown allows developers to leverage the simplicity of Markdown for whatever purpose this say fit.  This may include using hammerdown to convert text, XML, or HTML into Markdown.

# Examples

Below is a select group of examples.  More examples can be found by looking at the integration tests.

# Github Flavored Markdown Examples

## Tables
```javascript
var hammerdown = require("hammerdown").githubFlavoredHammerDown;

//Write markdown
hammerDown.tableRowOpen()
				.tableHeaderOpen()
					.text("header1")
				.tableHeaderClose()
				.tableHeaderOpen()
					.text("header2")
				.tableHeaderClose()
			.tableRowClose()
			.tableRowOpen()
				.tableDataOpen()
					.text("row1-col1")
				.tableDataClose()
				.tableDataOpen()
					.text("row1-col2")
				.tableDataClose()
			.tableRowClose()
			.done();

hammerDown.readableStream().pipe(process.stdout);

//Outputs
//	|header1|header2|
//	|---|---|
//	|row1-col1|row1-col2|
```

## Fenced Code Block
```javascript
var hammerdown = require("hammerdown").githubFlavoredHammerDown;

//Write markdown
hammerDown.blockCodeOpen()
				.codeOpen()
				.text("function myFunction(params){\n\treturn true;\n};\n")
				.codeClose()
			.blockCodeClose()
		.done();

hammerDown.readableStream().pipe(process.stdout);

//Outputs
// ```javascript
// function myFunction(params){
//	return true;
// };
// ```
```