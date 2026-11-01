const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let encoded = '';
  for (let i = 0; i < str.length;) {
    let end = i + 1;
    while (end < str.length && str[end] === str[i]) end += 1;
    const count = end - i;
    encoded += (count > 1 ? count : '') + str[i];
    i = end;
  }
  return encoded;
}

module.exports = {
  encodeLine
};
