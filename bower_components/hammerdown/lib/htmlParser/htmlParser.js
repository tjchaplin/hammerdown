var sax = require('sax');
var through = require('through');
var tagSelectors = require('./tagSelectors');
var HtmlFilterStream = require('./htmlFilterStream');
var textFormatter = require('../utils/textFormatter');
var ignoreChildren = /^(HEAD|APPLET|AREA|AUDIO|BUTTON|CANVAS|DATALIST|EMBED|HEAD|INPUT|MAP|MENU|METER|NOFRAMES|NOSCRIPT|OBJECT|OPTGROUP|OPTION|PARAM|PROGRESS|RP|RT|RUBY|SCRIPT|SELECT|STYLE|TEXTAREA|TITLE|VIDEO)$/;

var HtmlParser = module.exports = exports = function(options) {
    var self = this;
    var strict = false;
    var parser = sax.createStream(strict);
    var htmlFilterStream = new HtmlFilterStream();

    parser.on('text',function(text){self.onText(text);})
          .on('opentag',function(tag){self.onOpenTag(tag);})
          .on('closetag',function(tag){self.onCloseTag(tag);});

    this.tagdepth = 0;
    this.ignored = [];
    this.ignoring = false;
    this.inFormattedText = false;
    this.formattedTextTagNumber = 0;

    this.tr = through();
    this.tr.pipe(htmlFilterStream).pipe(parser);

    return this.tr;
};

HtmlParser.prototype.onText = function(text){
    if(this.ignoring)
        return;

    var isWhiteSpace = (/^\s*$/).test(text);
    if(isWhiteSpace && !this.inFormattedText)
        return;
    
    text = textFormatter.format(text);
    this.tr.emit("text",text);
};

HtmlParser.prototype.onOpenTag = function(tag){
    if(ignoreChildren.test(tag.name))
        this.ignoring = true;
    
    if(this.ignoring){
        this.ignored.push(tag.name);
        return;
    }

    var tagAttributes = tag.attributes;
    if(tag.name.toUpperCase() === 'CODE')
        tagAttributes = tagSelectors.codeLanguage(tag);

    if(tag.name.toUpperCase() === 'PRE'){
        this.formattedTextTagNumber++;
        this.inFormattedText = true;
    }

    for(var attribute in tagAttributes)
        tagAttributes[attribute.toLowerCase()] = tagAttributes[attribute];

    tag.attributes = tagAttributes;
    this.tr.emit('opentag',tag);
    if(tag.name.toUpperCase() !== 'HTML')
        this.tr.emit('tagdepth',++this.tagdepth);
};

HtmlParser.prototype.onCloseTag = function(tag){
    if(this.ignoring){
        this.ignored.pop();
        if(this.ignored.length === 0)
            this.ignoring = false;
        return;
    }

    if(tag.toUpperCase() === 'PRE'){
        this.formattedTextTagNumber--;
        if(this.formattedTextTagNumber === 0)
            this.inFormattedText = false;
    }

    this.tr.emit('closetag',tag);
    if(tag.toUpperCase() !== 'HTML')
        this.tr.emit('tagdepth',--this.tagdepth);
};