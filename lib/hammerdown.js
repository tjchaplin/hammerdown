var domain = require('domain');
var through = require('through');
var concat = require('concat-stream');
var HtmlToGFM = require('./converters/htmlToGFM');
var HtmlParser = require('./htmlParser/htmlParser');
var stringToStream = require('./utils/stringToStream');
var HtmlToMarkdown = require('./converters/htmlToMarkdown');

module.exports = function Hammerdown (options) {
    "use strict";

    if (!(this instanceof Hammerdown))
        return new Hammerdown(options);

    var parser = new HtmlParser();
    var htmlToMarkdown = getMarkdownConverter(options);

    parser.on('text',function(text){htmlToMarkdown.appendTextData(text);})
            .on('opentag',function(tag){htmlToMarkdown.convertOpenTag(tag.name,tag.attributes);})
            .on('closetag',function(tag){htmlToMarkdown.convertCloseTag(tag);})
            .on('tagdepth',function(depth){htmlToMarkdown.onTagDepth(depth);})
            .on('end',function(){ htmlToMarkdown.done();});

    var tr = through(function(buffer){
                var self = this;
                parser.write(buffer);
                htmlToMarkdown.readableStream.on('data',function(data){
                    self.queue(data);
                });
            },function(){
                var self = this;
                parser.push(null);
                htmlToMarkdown.readableStream.on('end',function(){
                    self.queue(null);
                });
            });
    tr.parse = function(text,cb){
        var self = this;
        var stringParser = through();

        var hammerdownDomain = domain.create(); 
        hammerdownDomain.on('error', function(error){
            if(cb)
                return cb(error);

            stringParser.emit('error',error);
        }); 
        hammerdownDomain.run(function() {         
            stringToStream(text).pipe(self).pipe(stringParser);
            if(cb)
                stringParser.pipe(concat(function(data){cb(null,data);}));
        });
        return stringParser;
    };
    return tr;
};

var getMarkdownConverter = function(options){
    if(!options)
        options = {};

    if(options.type === 'gfm')
        return new HtmlToGFM(options);

    return new HtmlToMarkdown(options);
};