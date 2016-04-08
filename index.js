var isInteger = require('is-integer')
var no = require('not-defined')
var staticProps = require('static-props')

var pkg = require('./package.json')

/**
 * Prepend package name to error message
 */

function msg (str) {
  return pkg.name + ': ' + str
}

var error = {}

staticProps(error)({
  leftMatrixNotCompatible: msg('Cannot multiply matrix at left side'),
  rightMatrixNotCompatible: msg('Cannot multiply matrix at right side')
})

function matrixToArrayIndex (i, j, numCols) {
  return j + i * numCols
}

function realAddition (a, b) { return a + b }

function realMultiplication (a, b) { return a * b }

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

  var op = {}

  if (no(customOperator)) customOperator = {}

  var customAdd = customOperator.addition
  var customMul = customOperator.multiplication

  if (no(customAdd)) op.add = realAddition
  else op.add = customAdd

  if (no(customMul)) op.mul = realMultiplication
  else op.mul = customMul

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
      // Left num rows
      var rows = leftMatrix.length / middle
      // Right num cols
      var cols = rightMatrix.length / middle

      if (!isInteger(rows)) {
        throw new TypeError(error.leftMatrixNotCompatible)
      }

      if (!isInteger(cols)) {
        throw new TypeError(error.rightMatrixNotCompatible)
      }

      var data = []

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          var leftIndex = matrixToArrayIndex(i, 0, middle)
          var rightIndex = matrixToArrayIndex(0, j, cols)

          var rightElement = rightMatrix[rightIndex]
          var leftElement = leftMatrix[leftIndex]

          var element = op.mul(leftElement, rightElement)

          for (var k = 1; k < middle; k++) {
            leftIndex = matrixToArrayIndex(i, k, middle)
            rightIndex = matrixToArrayIndex(k, j, cols)

            rightElement = rightMatrix[rightIndex]
            leftElement = leftMatrix[leftIndex]

            element = op.add(element, op.mul(rightElement, leftElement))
          }

          data.push(element)
        }
      }

      return data
    }
  }
}

staticProps(matrixMultiplication)({ error: error })

module.exports = matrixMultiplication
