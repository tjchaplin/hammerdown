var $ = require('./selector');

module.exports.codeLanguage = function(element){
  if(!$(element).hasClass('language-*'))
    return '';

  var attribs = $(element).attr('class').split(/\s+/);
  for(var i = 0;i< attribs.length; i++){
    var hasLanguage = attribs[i].match(/^language-*/);
    if(hasLanguage !== null)
      return attribs[i].replace('language-','');
  }
};