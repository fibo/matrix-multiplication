const no = require('not-defined')
const staticProps = require('static-props')

const pkg = require('./package.json')

/**
 * Prepend package name to error message
 */

function msg (str) {
  return pkg.name + ': ' + str
}

const error = {}

staticProps(error)({
  leftMatrixNotCompatible: msg('Cannot multiply matrix at left side'),
  rightMatrixNotCompatible: msg('Cannot multiply matrix at right side')
})

const matrixToArrayIndex = (i, j, numCols) => (j + i * numCols)

/**
 * Multiply two matrices, row by column.
 *
 * @param {Number} customOperator
 * @param {Function} [customOperator.addition]
 * @param {Function} [customOperator.multiplication]
 *
 * @returns {Function} operator
 */

function matrixMultiplication (customOperator) {
  // operators

  if (no(customOperator)) customOperator = {}

  var add = customOperator.addition
  var mul = customOperator.multiplication

  // Default to operators over Reals.
  if (no(add)) add = (a, b) => (a + b)
  if (no(mul)) mul = (a, b) => (a * b)

 /**
  * @param {Number} middle
  *
  * @returns {Function} mul
  */

  return function (middle) {
   /**
    * @param {Array} leftMatrix
    * @param {Array} rightMatrix
    *
    * @returns {Array} matrix
    */

    return function (leftMatrix, rightMatrix) {
      // Compatibilty check.

      const cols = rightMatrix.length / middle // right num cols
      const rows = leftMatrix.length / middle  // left num rows

      const colsIsNotInteger = Math.floor(cols) !== cols
      const rowsIsNotInteger = Math.floor(rows) !== rows

      if (colsIsNotInteger) throw new TypeError(error.rightMatrixNotCompatible)
      if (rowsIsNotInteger) throw new TypeError(error.leftMatrixNotCompatible)

      // Compute result data.

      var data = []

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          var leftIndex = matrixToArrayIndex(i, 0, middle)
          var rightIndex = matrixToArrayIndex(0, j, cols)

          var rightElement = rightMatrix[rightIndex]
          var leftElement = leftMatrix[leftIndex]

          var element = mul(leftElement, rightElement)

          for (var k = 1; k < middle; k++) {
            leftIndex = matrixToArrayIndex(i, k, middle)
            rightIndex = matrixToArrayIndex(k, j, cols)

            rightElement = rightMatrix[rightIndex]
            leftElement = leftMatrix[leftIndex]

            element = add(element, mul(rightElement, leftElement))
          }

          data.push(element)
        }
      }

      return data
    }
  }
}

staticProps(matrixMultiplication)({ error })

module.exports = matrixMultiplication
