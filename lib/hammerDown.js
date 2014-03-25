var sax = require('sax');
var through = require('through');
var constants = require('./constants');
var tagSelectors = require('./utils/tagSelectors');
var HtmlFilterStream = require('./htmlFilterStream');
var HtmlToMarkdown = require('./converters/htmlToMarkdown');

var HtmlConverterStream = module.exports = exports = function(options) {
    var htmlToMarkdown = new HtmlToMarkdown(options);  
    var htmlFilterStream = new HtmlFilterStream();

    var tr = through(function(buffer){
                var self = this;
                htmlFilterStream.write(buffer);

                htmlToMarkdown.readableStream.on('data',function(data){
                    self.queue(data);
                });
            },function(){
                var self = this;
                htmlFilterStream.push(null);
                htmlToMarkdown.readableStream.on('end',function(){
                self.queue(null);
            });
    });

    this.convertHtmlStream(htmlFilterStream,htmlToMarkdown);
    return tr;
};

HtmlConverterStream.prototype.convertHtmlStream = function(htmlStream,converter) {
    var self = this;
    var strict = false;
    var parser = sax.createStream(strict);

    htmlStream.pipe(parser);
    parser.on('text',function(text){
        var containsLettersOrNumbers = (/\w|\d| |\t/).test(text);
        if(!containsLettersOrNumbers)
            return;

        converter.appendTextData(text);
    }).on('opentag',function(tag){
        if(constants.ignoreChildren.test(tag.name))
            return;

        var tagAttributes = tag.attributes;
        if(tag.name.toUpperCase() === 'CODE')
            tagAttributes = tagSelectors.codeLanguage(tag);

        for(var attribute in tagAttributes)
            tagAttributes[attribute.toLowerCase()] = tagAttributes[attribute];

        if(converter.hasTag(tag.name))
            converter.convertOpenTag(tag.name,tagAttributes);
    }).on('closetag',function(tag){
        if(converter.hasTag(tag))
            converter.convertCloseTag(tag);
    }).on('end',function(){
        converter.done();
    });
};