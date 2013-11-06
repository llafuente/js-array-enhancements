(function () {
    "use strict";

/**
* TODO
* - some mozilla functions use .call but thisp could be "undefined" so -> can be replaced by direct call ?!
*
*/

    var defineProperty = Object.defineProperty || function (obj, name, prop) {
            if (prop.get || prop.set) {
                throw new Error("this is not supported in your js.engine");
            }
            obj[name] = prop.value;
        },
        slice = Array.prototype.slice,
        hasOwnProperty = Object.hasOwnProperty;

    /**
     * Create an array given any type of argument
     *
     * @param {Mixed} item
     * @returns {Array}
     */
    Array.ize = function (item) {
        var out,
            i;

        if (item === null || item === undefined) {
            return [];
        }

        if (item instanceof Array) {
            return item;
        }

        if (hasOwnProperty.call(item, "callee")) {
            return slice.call(item);
        }

        // TODO deal with Iterable objects like Collections!

        return [ item ];
    };

    Array.from = Array.ize;

    /**
     * Append any given number of arrays into a new one that will be returned
     * TODO support any type of arguments
     *
     * @returns {Array}
    */
    Array.add = function () {
        var i,
            j,
            ret = [],
            ar;

        for (i = 0; i < arguments.length; ++i) {
            ar = arguments[i];
            for (j = 0; j < ar.length; ++j) {
                ret.push(ar[j]);
            }
        }

        return ret;
    };
    /**
     * Clone an dense array
     *
     * @param {Array} ar
     * @returns {Array}
    */
    Array.clone = function (ar, deep) {
        var i = ar.length,
            clone = new Array(i);
        while (i--) {
            if (deep && ar[i] instanceof Array) {
                clone[i] = Array.clone(ar[i], true);
            } else {
                clone[i] = ar[i];
            }
        }
        return clone;
    };
    /**
     * Add an element at the specified index
     *
     * @param {Array} ar
     * @param {Mixed} o The object to add
     * @param {int} index The index position the element has to be inserted
     * @return {Boolean} true if o is successfully inserted
     */
    Array.insertAt = function (ar, o, index) {
        if (index > -1 && index <= ar.length) {
            ar.splice(index, 0, o);
            return true;
        }
        return false;
    };
    /**
     * Get a random value, the array must be condensed
     *
     * @param {Array} arr
     * @returns {Mixed}
     */
    Array.random = function (arr) {
        var l = Math.floor(Math.random() * arr.length);
        return arr[l];
    };
    /**
     * Remove duplicates from an array
     *
     * @param {Array} arr
     * @returns {Array}
     */
    Array.unique = function (arr) {
        var ret = [],
            i;

        for (i = 0; i < arr.length; ++i) {
            if (ret.indexOf(arr[i]) === -1) {
                ret.push(arr[i]);
            }
        }

        return ret;
    };

    /**
     * sort an array (must be dense)
     *
     * @param {Array} arr
     * @returns {Array}
     */
    Array.sortObject = function (arr, key) {
        var ret = [],
            slist = [],
            i;

        arr.sort(function (a, b) {
            if ("string" === (typeof a)) {
                return a.value.toLowerCase().localeCompare(b.value.toLowerCase());
            }
            return a[key] - b[key];
        });

        return arr;
    };
    /**
     * This function shuffles (randomizes the order of the elements in) an array.
     * credits -  http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
     * @note Given array is modified!
     * @param {Array} arr
     * @returns {Array}
     */
    Array.shuffle = function (arr) {
        var currentIndex = arr.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }

        return arr;
    };

    /**
     * Iterates over each value in the array passing them to the callback function.
     * Returns an array with all the callback results
     * @param {Array} arr
     * @param {Function} fun
     * @returns {Array}
     */
    Array.rfilter = function (arr, fun /*, thisp */) {
        if (arr === null) {
            throw new TypeError();
        }

        var t = Object(arr),
            len = t.length >>> 0,
            res,
            thisp,
            i,
            val,
            r;

        if ('function' !== typeof fun) {
            throw new TypeError();
        }

        res = [];
        thisp = arguments[1];
        for (i = 0; i < len; i++) {
            if (i in t) {
                val = t[i]; // in case fun mutates this
                r = fun.call(thisp, val, i, t);
                if (r !== undefined) {
                    res.push(r);
                }
            }
        }

        return res;
    };

    Array.chunk = function (arr, size, preserve_keys) {
        preserve_keys = preserve_keys || false;

        var i = 0,
            j = 0,
            key,
            val,
            chunks = [[]];

        //while( @list( $key, $value ) = @each( arr ) ) {
        for (key = 0; key < arr.length; ++key) {
            val = arr[key];


            if (chunks[i].length < size) {
                if (preserve_keys) {
                    chunks[i][key] = val;
                    j++;
                } else {
                    chunks[i].push(val);
                }
            } else {
                i++;
                chunks.push([]);

                if (preserve_keys) {
                    chunks[i][key] = val;
                    j++;
                } else {
                    j = 0;
                    chunks[i][j] = val;
                }
            }
        }

        return chunks;
    };
    /**
     * returns the values from a single column of the array-of-objects/arrays, identified by the column_key.
     * Optionally, you may provide an index_key to index the values in the returned array by the values from the index_key column in the input array.
     */
    Array.column = function (arr, field) {
        return Array.rfilter(arr, function (x) { return x ? x[field] : undefined; });
    };
    /**
     * Append any number of arrays into the first one
     *
     * @param {Array} dst
     * @returns {Array}
     */
    Array.combine = function (dst) {
        var i,
            j,
            ar;

        for (j = 1; j < arguments.length; ++j) {
            ar = arguments[j];

            for (i = 0; i < ar.length; ++i) {
                dst.push(ar[i]);
            }
        }
    };

    Array.count_values = function(arr, lower_case) {
        lower_case = lower_case || false;
        var i,
            counter = {},
            val;

        for (i = 0; i < arr.length; ++i) {
            val = arr[i];
            if (lower_case && "string" === typeof val) {
                val = val.toLowerCase();
            }

            if (counter[val]) {
                ++counter[val];
            } else {
                counter[val] = 1;
            }
        }

        return counter;
    }
    /**
     * Returns a copy of the array padded to size specified by size with value value. If size is positive then the array is padded on the right, if it's negative then on the left. If the absolute value of size is less than or equal to the length of the array then no padding takes place
     */
    Array.pad = function(arr, size, value) {
        if (Math.abs(size) <= arr.length) {
            return arr;
        }
        var out = [],
            i,
            len;

        if (size > 0 ) {
            for(i = 0;  i < size; ++i) {
                out[i] = i < arr.length ? arr[i] : value;
            }
        } else {
            size = Math.abs(size);
            len = size - arr.length;
            for(i = 0;  i < size; ++i) {
                out[i] = i < len ? value : arr[i - len];
            }
        }

        return out;
    }
    /**
     * Calculate the product of values in an array
     */
    Array.product = function (arr) {
        var sum = 1,
            len = arr.length,
            i;

        for (i = 0; i < len; i++) {
            sum *= parseFloat(arr[i]); // be sure it's a number...
        }

        return sum;
    };
    /**
     * Picks one or more random entries out of an array, and returns the key (or keys) of the random entries.
     */
    Array.rand = function(arr, len) {
        var len = len || 1,
            out = [];

        for (i = 0; i < len; ++i) {
            out.push(Math.floor(Math.random() * arr.length));
        }

        return out;
    }

    Array.dense = function(arr) {
        var out = [];

        arr.forEach(function(val) {
            out.push(val);
        });

        return out;
    }

    Array.sum = function (arr) {
        var sum = 0,
            len = arr.length,
            i;

        for (i = 0; i < len; i++) {
            sum += parseFloat(arr[i]); // be sure it's a number...
        }

        return sum;
    };

    Array.fill = function (start, count, value) {
        var arr = [],
            len = start + count,
            i;

        for (i = start; i < len; ++i) {
            arr[i] = value;
        }

        return arr;
    };

    Array.column = function (arr, field) {
        return Array.rfilter(arr, function (x) { return x[field]; });
    };

    /**
     * returns an object with the same values keys given a property of the object
     * @throws if the field is undefined!
     */
    Array.kmap = function (arr, field) {
        var ret = {};

        arr.forEach(function (v) {
            if (!v[field]) {
                console.log(v);
                throw new Error("field not found in v");
            }

            ret[v[field]] = v;
        });

        return ret;
    }


    // from mozilla
    if (!Array.prototype.reduce) {
        /**
         * Applies iteratively the callback function to the elements of the array, so as to reduce the array to a single value.
         */
        Array.prototype.reduce = function reduce(accumulator) {
            var i, l = this.length, curr;

            if (typeof accumulator !== "function") { // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
                throw new TypeError("First argument is not callable");
            }

            if ((l === 0 || l === null) && (arguments.length <= 1)) {// == on purpose to test 0 and false.
                throw new TypeError("Array length is 0 and no second argument");
            }

            if (arguments.length <= 1) {
                curr = this[0]; // Increase i to start searching the secondly defined element in the array
                i = 1; // start accumulating at the second element
            } else {
                curr = arguments[1];
            }

            for (i = i || 0; i < l; ++i) {
                if (i in this) {
                    curr = accumulator.call(undefined, curr, this[i], i, this);
                }
            }

            return curr;
        };
    }

    // from mozilla
    if (!Array.prototype.filter) {
        /**
        * Iterates over each value in the array passing them to the callback function. If the callback function returns true, the current value from array is returned into the result array.
        */
        Array.prototype.filter = function (fun /*, thisp */) {
            if (this === null) {
                throw new TypeError();
            }

            var t = Object(this),
                len = t.length >>> 0,
                res,
                thisp,
                i,
                val;

            if ('function' !== typeof fun) {
                throw new TypeError();
            }

            res = [];
            thisp = arguments[1];
            for (i = 0; i < len; i++) {
                if (i in t) {
                    val = t[i]; // in case fun mutates this
                    if (fun.call(thisp, val, i, t)) {
                        res.push(val);
                    }
                }
            }

            return res;
        };
    }

    // from mozilla
    if ('function' !== typeof Array.prototype.reduceRight) {
        Array.prototype.reduceRight = function (callback, opt_initialValue) {
            if (null === this || 'undefined' === typeof this) {
                // At the moment all modern browsers, that support strict mode, have
                // native implementation of Array.prototype.reduceRight. For instance,
                // IE8 does not support strict mode, so this check is actually useless.
                throw new TypeError('Array.prototype.reduceRight called on null or undefined');
            }

            if ('function' !== typeof callback) {
                throw new TypeError(callback + ' is not a function');
            }

            var length = this.length >>> 0,
                index,
                value,
                isValueSet = false;

            if (1 < arguments.length) {
                value = opt_initialValue;
                isValueSet = true;
            }
            for (index = length - 1; -1 < index; --index) {
                if (this.hasOwnProperty(index)) {
                    if (isValueSet) {
                        value = callback(value, this[index], index, this);
                    } else {
                        value = this[index];
                        isValueSet = true;
                    }
                }
            }
            if (!isValueSet) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            return value;
        };
    }

    // from mozilla
    if (!Array.prototype.some) {
        Array.prototype.some = function (fun /*, thisp */) {
            if (this === null) {
                throw new TypeError();
            }
            if (typeof fun !== "function") {
                throw new TypeError();
            }

            var t = Object(this),
                len = t.length >>> 0,
                thisp = arguments[1],
                i;

            for (i = 0; i < len; i++) {
                if (i in t && fun.call(thisp, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    // from mozilla
    if (!Array.prototype.every) {
        Array.prototype.every = function (fun /*, thisp */) {
            var t,
                len,
                i,
                thisp;

            if (this === null) {
                throw new TypeError();
            }

            t = Object(this);
            len = t.length >>> 0;
            if (typeof fun !== 'function') {
                throw new TypeError();
            }

            thisp = arguments[1];
            for (i = 0; i < len; i++) {
                if (i in t && !fun.call(thisp, t[i], i, t)) {
                    return false;
                }
            }

            return true;
        };
    }

    // from mozilla
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn, scope) {
            var i,
                len;

            for (i = 0, len = this.length; i < len; ++i) {
                if (i in this) {
                    fn.call(scope, this[i], i, this);
                }
            }
        };
    }

    // from mozilla
    // Production steps of ECMA-262, Edition 5, 15.4.4.19
    // Reference: http://es5.github.com/#x15.4.4.19
    if (!Array.prototype.map) {
        Array.prototype.map = function (callback, thisArg) {
            var T,
                A,
                k,
                O,
                len,
                kValue,
                mappedValue;

            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }

            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            len = O.length >>> 0;

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (thisArg) {
                T = thisArg;
            }

            // 6. Let A be a new array created as if by the expression new Array(len) where Array is
            // the standard built-in constructor with that name and len is the value of len.
            A = new Array(len);

            // 7. Let k be 0
            k = 0;

            // 8. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                    kValue = O[k];

                    // ii. Let mappedValue be the result of calling the Call internal method of callback
                    // with T as the this value and argument list containing kValue, k, and O.
                    mappedValue = callback.call(T, kValue, k, O);

                    // iii. Call the DefineOwnProperty internal method of A with arguments
                    // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
                    // and false.

                    // In browsers that support Object.defineProperty, use the following:
                    // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

                    // For best browser support, use the following:
                    A[k] = mappedValue;
                }
                // d. Increase k by 1.
                k++;
            }

            // 9. return A
            return A;
        };
    }

    // from mozilla
    if(!Array.isArray) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
        };
    }

}());