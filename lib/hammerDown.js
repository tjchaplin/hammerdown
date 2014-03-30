var through = require('through');
var HtmlParser = require('./htmlParser/htmlParser');
var HtmlToGFM = require('./converters/htmlToGFM');
var HtmlToMarkdown = require('./converters/htmlToMarkdown');

module.exports = function hammerdown (options) {    
    var parser = new HtmlParser();
    var htmlToMarkdown = getMarkdownConverter(options);

    parser.on('text',function(text){htmlToMarkdown.appendTextData(text)})
            .on('opentag',function(tag){htmlToMarkdown.convertOpenTag(tag.name,tag.attributes);})
            .on('closetag',function(tag){htmlToMarkdown.convertCloseTag(tag);})
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

    return tr;
};

var getMarkdownConverter = function(options){
    if(!options)
        options = {};

    if(options.type === 'gfm')
        return new HtmlToGFM(options);

    return new HtmlToMarkdown(options);
};