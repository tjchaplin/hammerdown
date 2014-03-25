var through = require('through');
var HtmlFilterStream = require('./utils/htmlFilterStream');
var HtmlConverterStream = require('./converters/htmlConverterStream');

module.exports = function hammerdown (options) {
    var htmlFilterStream = new HtmlFilterStream();
    var htmlConverterStream = new HtmlConverterStream(options,htmlFilterStream);

    var tr = through(function(buffer){
                var self = this;

                htmlFilterStream.write(buffer);
                htmlConverterStream.readableStream.on('data',function(data){
                    self.queue(data);
                });
            },function(){
                var self = this;

                htmlFilterStream.push(null);
                htmlConverterStream.readableStream.on('end',function(){
                    self.queue(null);
                });
            });

    htmlConverterStream.convert();
    return tr;
};