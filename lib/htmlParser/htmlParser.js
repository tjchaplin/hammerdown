var sax = require('sax');
var through = require('through');
var constants = require('../constants');
var tagSelectors = require('./tagSelectors');
var HtmlFilterStream = require('./htmlFilterStream');
var textFormatter = require('../utils/textFormatter');

var HtmlParser = module.exports = exports = function(options) {
    var self = this;
    var strict = false;
    var parser = sax.createStream(strict);
    var htmlFilterStream = new HtmlFilterStream();

    parser.on('text',function(text){self.onText(text)})
          .on('opentag',function(tag){self.onOpenTag(tag)})
          .on('closetag',function(tag){self.onCloseTag(tag)})

    this.tr = through();
    this.tr.pipe(htmlFilterStream).pipe(parser);

    return this.tr;
};

HtmlParser.prototype.onText = function(text){
    var containsLettersOrNumbers = (/\w|\d| |\t/).test(text);
    if(!containsLettersOrNumbers)
        return;

    text = textFormatter.format(text);
    this.tr.emit("text",text);
};

HtmlParser.prototype.onOpenTag = function(tag){
    if(constants.ignoreChildren.test(tag.name))
        return;

    var tagAttributes = tag.attributes;
    if(tag.name.toUpperCase() === 'CODE')
        tagAttributes = tagSelectors.codeLanguage(tag);

    for(var attribute in tagAttributes)
        tagAttributes[attribute.toLowerCase()] = tagAttributes[attribute];

    tag.attributes = tagAttributes;
    this.tr.emit('opentag',tag);
};

HtmlParser.prototype.onCloseTag = function(tag){
    this.tr.emit('closetag',tag);
};