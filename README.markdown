# js-array-enhancements[![Build Status](https://secure.travis-ci.org/llafuente/js-array-enhancements.png?branch=master)](http://travis-ci.org/llafuente/js-array-enhancements)


## Introduction


Functions included

``` js

var array = require("array-enhancements");

// Create an array given any type of argument
array.ize (item): Array

// Append any given number of arrays into a new one
array.add([Array, ...]): Array

// Clone (could be recursive) a dense array
// Note: only loop arrays not objects
array.clone(Array) -> Array

// Add an element at the specified index
array.insertAt(Array, Mixed, Number) -> Boolean

// Append any number of arrays into the first one
array.combine(Array, [Array, ...])

// Counts all the values of an array
array.countValues(array[, case_insensitive])

// Returns a copy of the array padded to size specified by size with value value.
// If size is positive then the array is padded on the right,
// if it's negative then on the left. If the absolute value of size is less than
// or equal to the length of the array then no padding takes place
array.pad(arr, size, value)

// Calculate the product of values in an array
array.product: Number|NaN

// Calculate the product of values in an array
array.sum(arr): Number|NaN

// create a new dense array from given one
array.dense(arr): Array

// Picks one or more random entries out of an array, and returns the key (or keys) of the random entries.
array.rand(arr, len)

// Fill an array with values
array.fill(start, count, value)

// Return the values from a single column in the input array
array.column(arr, field): Array

// Returns an object with the same values keys given a property of the object
array.kmap(arr, field)

// Get a random value, the array must be dense
array.random(Array): Mixed

// Create a new array removing duplicated values
array.unique(Array): Array


# compatibility layer for old browsers @lib/arrays-compat.js
Array.prototype.reduce
Array.prototype.filter
Array.prototype.reduceRight
Array.prototype.some
Array.prototype.every
Array.prototype.map
Array.prototype.forEach

```

## Install

With [npm](http://npmjs.org) do:

```

npm install array-enhancements

```

## test (travis-ci ready!)

```

npm test
// or
cd /test
node test.js

```

## license

MIT.
