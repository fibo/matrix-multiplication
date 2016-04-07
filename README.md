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

Optional custom operators are supported.

### `var mul = matrixMultiplication([customOperator])`

* **@param** `{Object}` [customOperator]
* **@param** `{Function}` [customOperator.addition] defaults to common `+`
* **@param** `{Function}` [customOperator.multiplication] defaults to common `*`
* **@returns** `{Function}` operator

### `mul(middle, leftMatrix, rightMatrix)`

The only requirement needed to multiply row by column an **a x b** matrix by
an **c x d** matrix is that `b = c`, i.e. the middle indexes are equal.
Actually two compatible matrices are **n x m** and **m x l**, let's call **m** the *middle*.

* **@param** `{Number}` middle
* **@param** `{Array}` leftMatrix
* **@param** `{Array}` rightMatrix
* **@returns** `{Array}` matrix

### `matrixMultiplication.error`

An object exposing the following error messages:

* leftMatrixNotCompatible
* rightMatrixNotCompatible

## License

[MIT](http://g14n.info/mit-license/)
