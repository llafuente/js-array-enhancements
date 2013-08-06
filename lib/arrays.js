(function () {
    "use strict";

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
     * @memberOf Array
     * @static
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
     * Append any given number of arrays in to one that will be return
     * TODO support any type of arguments
     *
     * @memberOf Array
     * @static
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
     * Clone an array
     *
     * @memberOf Array
     * @static
     * @param {Array} ar
     * @returns {Array}
    */
    Array.clone = function (ar) {
        var i = ar.length,
            clone = new Array(i);
        while (i--) {
            clone[i] = ar[i];
        }
        return clone;
    };

    /**
     * Add an element at the specified index
     *
     * @memberOf Array
     * @static
     * @param {Array} ar
     * @param {Object} o The object to add
     * @param {int} index The index position the element has to be inserted
     * @return {Boolean} True if you can insert
     */
    Array.insertAt = function (ar, o, index) {
        if (index > -1 && index <= ar.length) {
            ar.splice(index, 0, o);
            return true;
        }
        return false;
    };

    /**
     * Append any number of arrays into the first one
     *
     * @memberOf Array
     * @static
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
    /**
     * Get a random value, the array must be condensed
     *
     * @memberOf Array
     * @static
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
     * @memberOf Array
     * @static
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

}());