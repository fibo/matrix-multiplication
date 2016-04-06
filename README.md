# matrix-multiplication

> implements row by column multiplication

[![NPM version](https://badge.fury.io/js/matrix-multiplication.svg)](http://badge.fury.io/js/matrix-multiplication) [![Build Status](https://travis-ci.org/fibo/matrix-multiplication.svg?branch=master)](https://travis-ci.org/fibo/matrix-multiplication?branch=master) [![Dependency Status](https://gemnasium.com/fibo/matrix-multiplication.svg)](https://gemnasium.com/fibo/matrix-multiplication)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

**Table Of Contents:**

* [Installation](#installation)
* [Examples](#examples)
* [API](#api)
* [License](#license)

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install matrix-multiplication
```

## Examples

All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/matrix-multiplication/blob/master/test.js).

## API

### `var mul = matrixMultiplication([customAdd, customMul])`

* **@param** `{Function}` [customAdd] defaults to common `+`
* **@param** `{Function}` [customMul] defaults to common `*`
* **@returns** `{Function}` operator

### `mul(leftNumRows, rightNumCols, leftMatrix, rightMatrix)`

* **@param** `{NUmber}` leftNumRows
* **@param** `{NUmber}` rightNumCols
* **@param** `{Array}` leftMatrix
* **@param** `{Array}` rightMatrix
* **@returns** `{Array}` matrix

### `matrixMultiplication.error`

An object exposing the following error messages:

* leftNumCols
* rightNumCols
* cannotMultiplyMatrices

## License

[MIT](http://g14n.info/mit-license/)
