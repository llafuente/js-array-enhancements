# js-array-enhancements [![Build Status](https://secure.travis-ci.org/llafuente/js-array-enhancements.png?branch=master)](http://travis-ci.org/llafuente/js-array-enhancements)
==========

## Introduction
============

Functions included

``` js
Array.ize (Array.from) -> Array
Create an array given any type of argument

Array.append([Array, ...]) -> Array
Append any given number of arrays in to one that will be return

Array.clone(Array) -> Array
Clone an array

Array.insertAt(Array, Mixed, Number) -> Boolean
Add an element at the specified index

Array.combine(Array, [Array, ...])
Append any number of arrays into the first one

Array.random(Array) -> Mixed
Get a random value, the array must be condensed

Array.unique(Array) -> Array
Remove duplicates from an array

```

## Install
==========

With [npm](http://npmjs.org) do:

```

npm install array-enhancements

```

## test (travis-ci ready!)
==========================

```

npm test
// or
cd /test
node test.js

```

## license
==========

MIT.
