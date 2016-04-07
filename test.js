var test = require('tape')
var matrixMultiplication = require('./index')

var mul = matrixMultiplication()

test('square matrices 2x2', function (t) {
  t.plan(1)

  var leftMatrix = [2, 3,
                     1, 1]
  var rightMatrix = [0, 1,
                     -1, 0]

  var data = mul(2, leftMatrix, rightMatrix)

  t.deepEqual(data, [-3, 2,
                     -1, 1])
})

test('multiply 3x2 by 2x4', function (t) {
  t.plan(1)

  var mul2 = mul.bind(null, 2)

  var matrix3x2 = [2, 3,
                   1, 1,
                   1, 1]
  var matrix2x4 = [0, 1, 1, 1,
                  -1, 0, 2, 3]

  t.deepEqual(mul2(matrix3x2, matrix2x4), [-3, 2, 8, 11,
                                           -1, 1, 3, 4,
                                           -1, 1, 3, 4])
})

test('custom field', function (t) {
  t.plan(1)

  function booleanAdd (a, b) { return a || b }
  function booleanMul (a, b) { return a && b }

  var customOperators = {
    addition: booleanAdd,
    multiplication: booleanMul
  }

  var mul = matrixMultiplication(customOperators)

  var y = true
  var n = false

  var leftMatrix = [n, y,
                    y, n]
  var rightMatrix = [y, n,
                     n, y]

  var data = mul(2, leftMatrix, rightMatrix)

  t.deepEqual(data, [n, y,
                     y, n])
})
