const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const result = [];
  let nextAction = null;
  for (let i = 0; i < arr.length; i += 1) {
    const value = arr[i];
    if (value === '--discard-next' || value === '--double-next') {
      nextAction = value;
    } else if (value === '--discard-prev' || value === '--double-prev') {
      if (result.length && result[result.length - 1].index === i - 1) {
        if (value === '--discard-prev') result.pop();
        else result.push({ index: i - 1, value: arr[i - 1] });
      }
    } else {
      if (nextAction !== '--discard-next') {
        result.push({ index: i, value });
        if (nextAction === '--double-next') result.push({ index: i, value });
      }
      nextAction = null;
    }
  }
  return result.map(item => item.value);
}

module.exports = {
  transform
};
