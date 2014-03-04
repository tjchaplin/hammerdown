hammerdown
==========

[![Build Status](https://travis-ci.org/tjchaplin/hammerdown.png?branch=master)](https://travis-ci.org/tjchaplin/hammerdown)

Streaming Markdown Writer

# Get Started

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
	# A Markdown Header

	Some text **bold text**
```

# Install

```
npm install hammerdown
```

# Purpose 

To have an easy way to programatically generate a stream of markdown text.  This library includes a complete set of Markdown attributes to generate Markdown document streams.

Markdown is a mechanism to create documents [see](http://daringfireball.net/projects/markdown/) for more details.  This library allows developers to leverage the simplicity of Markdown for whatever purpose this say fit.  This may include using hammerdown to convert text, XML, or HTML into Markdown.

# Examples

The integration tests show examples of the different usages of the api
