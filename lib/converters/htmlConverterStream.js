var sax = require('sax');
var constants = require('../constants');
var tagSelectors = require('../utils/tagSelectors');
var HtmlToMarkdown = require('../converters/htmlToMarkdown');

var HtmlConverterStream = module.exports = exports = function(options,htmlStream) {
    this.htmlFilterStream = htmlStream;
    this.htmlToMarkdown = new HtmlToMarkdown(options);
    this.readableStream = this.htmlToMarkdown.readableStream;
};

HtmlConverterStream.prototype.convert = function(){
    var self = this;
    var strict = false;
    var parser = sax.createStream(strict);
    
    this.htmlFilterStream.pipe(parser);

    parser.on('text',function(text){self.onText(text)})
          .on('opentag',function(tag){self.onOpenTag(tag)})
          .on('closetag',function(tag){self.onCloseTag(tag)})
          .on('end',function(){self.onEnd();});
};

HtmlConverterStream.prototype.onText = function(text){
    var containsLettersOrNumbers = (/\w|\d| |\t/).test(text);
    if(!containsLettersOrNumbers)
        return;

    this.htmlToMarkdown.appendTextData(text);
};

HtmlConverterStream.prototype.onOpenTag = function(tag){
    if(constants.ignoreChildren.test(tag.name))
        return;

    var tagAttributes = tag.attributes;
    if(tag.name.toUpperCase() === 'CODE')
        tagAttributes = tagSelectors.codeLanguage(tag);

    for(var attribute in tagAttributes)
        tagAttributes[attribute.toLowerCase()] = tagAttributes[attribute];

    if(this.htmlToMarkdown.hasTag(tag.name))
        this.htmlToMarkdown.convertOpenTag(tag.name,tagAttributes);
};

HtmlConverterStream.prototype.onCloseTag = function(tag){
    if(this.htmlToMarkdown.hasTag(tag))
        this.htmlToMarkdown.convertCloseTag(tag);
};

HtmlConverterStream.prototype.onEnd = function(){
    this.htmlToMarkdown.done();
};