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
  leftNumCols: msg('leftNumCols does not divide leftMatrix.length'),
  rightNumRows: msg('rightNumRows does not divide rightMatrix.length'),
  cannotMultiplyMatrices: msg('Cannot multiply matrices, leftNumCols != rightNumRows')
})

function isInteger (n) {
  return (typeof n === 'number') && isFinite(n) && (n % 1 === 0)
}

function matrixToArrayIndex (i, j, numCols) {
  return j + i * numCols
}

function realAddition (a, b) { return a + b }

function realMultiplication (a, b) { return a * b }

/**
 * Multiply two matrices, row by column.
 *
 * @param {Function} [addition]
 * @param {Function} [multiplication]
 *
 * @returns {Function} operator
 */

function matrixMultiplication (add, mul) {
  // operators
  var op = {}

  if (no(add)) op.add = realAddition
  else op.add = add

  if (no(mul)) op.mul = realMultiplication
  else op.mul = mul

 /**
  * @param {Number} leftNumRows
  * @param {Number} rightNumCols
  * @param {Array} leftMatrix
  * @param {Array} rightMatrix
  *
  * @returns {Array} matrix
  */
  return function (leftNumRows, rightNumCols, leftMatrix, rightMatrix) {
    var leftNumCols = leftMatrix.length / leftNumRows
    var rightNumRows = rightMatrix.length / rightNumCols

    if (!isInteger(leftNumCols)) {
      throw new TypeError(error.leftNumCols)
    }

    if (!isInteger(rightNumRows)) {
      throw new TypeError(error.rightNumRows)
    }

    // Check if matrices can be multiplied.
    if (leftNumCols !== rightNumRows) {
      throw new TypeError(error.cannotMultiplyMatrices)
    }

    var commonIndex = leftNumCols
    var data = []
    var rows = leftNumRows
    var cols = rightNumCols

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        var leftIndex = matrixToArrayIndex(i, 0, commonIndex)
        var rightIndex = matrixToArrayIndex(0, j, cols)

        var rightElement = rightMatrix[rightIndex]
        var leftElement = leftMatrix[leftIndex]

        var element = op.mul(leftElement, rightElement)

        for (var k = 1; k < commonIndex; k++) {
          leftIndex = matrixToArrayIndex(i, k, commonIndex)
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

staticProps(matrixMultiplication)({ error: error })

module.exports = matrixMultiplication
