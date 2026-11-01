const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
  const blocked = new Set();
  let sum = 0;
  for (const row of matrix) {
    row.forEach((value, column) => {
      if (!blocked.has(column)) sum += value;
      if (value === 0) blocked.add(column);
    });
  }
  return sum;
}

module.exports = {
  getMatrixElementsSum
};
