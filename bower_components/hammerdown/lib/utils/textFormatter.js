module.exports.format = function format(text) {
  for (var key in replacements) {
    if (!hasOwnProperty.call(replacements, key)) 
      continue;

    var value = replacements[key];
    var replacementRegex = generateRegexReplacements();
    text = text.replace(replacementRegex[key], value);
  }

  return text;
};

var generateRegexReplacements = function() {
  var result = {};
  for (var key in replacements) {
    if (!hasOwnProperty.call(replacements, key)) continue;

    result[key] = new RegExp(key, 'g');
  }
  return result;
};

var replacements = {
  '#' : '\\#',
  '<' : '&lt;',
  '>' : '&gt;',
  '([0-9])\\.(\\s|$)': '$1\\.$2',
  '\u00a9': '(c)',
  '\u00ae': '(r)',
  '\u2122': '(tm)',
  '\u00a0': ' ',
  '\u00b7': '\\*',
  '\u2002': ' ',
  '\u2003': ' ',
  '\u2009': ' ',
  '\u2018': '\'',
  '\u2019': '\'',
  '\u201c': '"',
  '\u201d': '"',
  '\u2026': '...',
  '\u2013': '--',
  '\u2014': '---'
};