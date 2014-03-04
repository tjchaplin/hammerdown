module.exports.padLeft = function(stringToPad, times, padding) {
  if (!stringToPad)
    stringToPad = '';

  if (!times)
    times = 0;

  if (!padding)
    padding = ' ';
  
  for (var i = 0; i < times; i++) {
    stringToPad = padding+stringToPad;
  }

  return stringToPad;
};

module.exports.trim = function(stringToTrim) {
  if (!stringToTrim)
    stringToTrim = '';

  if (stringToTrim.trim)
    return stringToTrim.trim();

  return stringToTrim.replace(/^\s+|\s+$/g, '');
};