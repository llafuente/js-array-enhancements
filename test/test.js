(function () {
    "use strict";
    require("ass");

    require("../index.js");
    var tap = require("tap"),
        test = tap.test;


    test("Array.chunk", function (t) {
        t.deepEqual(Array.chunk(['a', 'b', 'c', 'd', 'e'], 2), [ [ 'a', 'b' ], [ 'c', 'd' ], [ 'e' ] ], "Array.chunk 2");
        t.deepEqual(Array.chunk(['a', 'b', 'c', 'd', 'e'], 2, true), [ [ 'a', 'b' ], [ , , 'c' ], [ , , , 'd' ], [ , , , , 'e' ] ], "Array.chunk 2 preserve keys");
        t.end();
    });

    test("Array.column", function (t) {
        var ar = [{x: 1, y: 2}, {x: 2}, {y: "b"}, {z: {x:1}}];

        t.deepEqual(Array.column(ar, "x"), [1, 2], "Array.column x");
        t.deepEqual(Array.column(ar, "y"), [2, "b"], "Array.column y");
        t.deepEqual(Array.column(ar, "z"), [{x:1}], "Array.column z");

        t.end();
    });

    test("Array.combine", function (t) {
        var ar = [1,2,3],
            ar2 = [4,5,6],
            ar3 = [7,8,9],
            ar4 = [10];

        Array.combine(ar, ar2);
        t.deepEqual(ar, [1, 2, 3, 4, 5, 6], "combine two args");

        Array.combine(ar, ar3, ar4);
        t.deepEqual(ar, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "combine three args");


        t.end();
    });



    test("Array.countValues", function (t) {
        var ar = ['J. Karjalainen', 'J. Karjalainen', 60, '60', 'J. Karjalainen', 'j. karjalainen', 'Fastway', 'FASTWAY', 'Fastway', 'fastway', 'YUP'],
            r1 = Array.countValues(ar, false),
            r2 = Array.countValues(ar, true);

        t.deepEqual(r1, { '60': 2,
            'J. Karjalainen': 3,
            'j. karjalainen': 1,
            Fastway: 2,
            FASTWAY: 1,
            fastway: 1,
            YUP: 1 }, "countValues case");


        t.deepEqual(r2, { '60': 2, 'j. karjalainen': 4, fastway: 4, yup: 1 }, "countValues icase");


        t.end();
    });


    test("Array.product", function (t) {
        var ar = [2, 4, 6, 8],
            r1 = Array.product(ar);

        t.deepEqual(r1, 384, "Array.product");

        t.end();
    });

    test("Array.dense", function (t) {
        var ar = [];

        ar[10] = 2;
        ar[20] = 4;

        t.deepEqual(Array.dense(ar), [2,4], "Array.dense");

        t.end();
    });


    test("Array.ize", function (t) {
        t.deepEqual(Array.ize(arguments), [ t ], "from args error");
        var obj = {x: 1};
        t.deepEqual(Array.ize(obj), [ obj ], "ize object error");
        var num = 1000;
        t.deepEqual(Array.ize(num), [ num ], "ize number error");
        var bool = true;
        t.deepEqual(Array.ize(bool), [ bool ], "ize boolean error");
        var string = "test";
        t.deepEqual(Array.ize(string), [ string ], "ize string error");
        var fn = function () {};
        t.deepEqual(Array.ize(fn), [ fn ], "ize string error");

        t.end();
    });


    test("Array.add", function (t) {
        var ar = [1,2,3],
            ar2 = [4,5,6],
            ar3 = [7,8,9];

        t.deepEqual(Array.add(ar, ar2), [1, 2, 3, 4, 5, 6], "add two arrays");
        t.deepEqual(Array.add(ar, ar2, ar3), [1, 2, 3, 4, 5, 6, 7, 8, 9], "add   three arrays");

        t.end();
    });




    test("Array.clone", function (t) {
        var ar = [1,2,3],
            ar2 = [4,{},6],
            ar3 = ["xxx", true, 1.0];

        t.deepEqual(Array.clone(ar), ar, "clone an array");
        t.deepEqual(Array.clone(ar2), ar2, "clone an array");
        t.deepEqual(Array.clone(ar3), ar3, "clone an array");
        t.equal(Array.clone(ar3) !== ar3, true, "clone is not the same as the orignal");



        t.end();
    });



    test("Array.insertAt", function (t) {
        var ar = [1,2,3];

        Array.insertAt(ar, 4, 3);
        console.log(ar);
        t.deepEqual(ar, [1, 2, 3, 4], "4 insertAt 3");

        Array.insertAt(ar, 0, 0);
        t.deepEqual(ar, [0, 1, 2, 3, 4], "4 insertAt 3");

        Array.insertAt(ar, 9, 2);
        t.deepEqual(ar, [0, 1, 9, 2, 3, 4], "4 insertAt 3");

        Array.insertAt(ar, 9, 50);
        t.deepEqual(ar, [0, 1, 9, 2, 3, 4], "out of bounds! no insert");

        Array.insertAt(ar, 9, -1);
        t.deepEqual(ar, [0, 1, 9, 2, 3, 4], "out of bounds! no insert");

        t.end();
    });



    test("Array.random", function (t) {
        var ar = [1,2,3];

        t.equal(ar.indexOf(Array.random(ar)) !== -1, true, "value is in the array");
        t.equal(ar.indexOf(Array.random(ar)) !== -1, true, "value is in the array");
        t.equal(ar.indexOf(Array.random(ar)) !== -1, true, "value is in the array");
        t.equal(ar.indexOf(Array.random(ar)) !== -1, true, "value is in the array");
        t.equal(ar.indexOf(Array.random(ar)) !== -1, true, "value is in the array");
        t.equal(ar.indexOf(Array.random(ar)) !== -1, true, "value is in the array");

        t.end();
    });

    test("Array.unique", function (t) {
        var ar = [1, 1, 2, 3, 4, 5, 6, 2, 1, 3, 5, 7, 78, 2, 1, "xxx", "yyy", "xxx"];

        t.deepEqual(Array.unique(ar), [1, 2, 3, 4, 5, 6, 7, 78, "xxx", "yyy"], "uniqueness");

        t.end();
    });



    test("Array.kmap", function (t) {
        var ar = [
            {key: "a", value: 1},
            {key: "b", value: 2},
            {key: "c", value: 3},
        ];

        t.deepEqual(Array.kmap(ar, "key"), {a: {key: "a", value: 1}, b: {key: "b", value: 2}, c: {key: "c", value: 3}}, "Array.kmap");

        t.end();
    });

    test("Array.sum", function (t) {
        t.deepEqual(Array.sum([1, 2, 3]), 6, "Array.sum");
        t.deepEqual(Array.sum([1, 2, 3, 4]), 10, "Array.sum");
        t.deepEqual(isNaN(Array.sum([1, 2, 3, 4, "x"])), true, "Array.sum NaN");

        t.end();
    });


    test("Array.fill", function (t) {
        t.deepEqual(Array.fill(0, 5, 9), [9,9,9,9,9], "Array.fill");
        t.deepEqual(Array.fill(1, 5, 9), [,9,9,9,9,9], "Array.fill");

        t.end();
    });

    test("Array.sortObject", function (t) {

        t.deepEqual(Array.sortObject([
            {value: 1},
            {value: 7},
            {value: 5},
            {value: 2}
        ], "value"), [
            {value: 1},
            {value: 2},
            {value: 5},
            {value: 7}
        ], "Array.sortObject");

        t.deepEqual(Array.sortObject([
            {value: "a"},
            {value: "z"},
            {value: "h"},
            {value: "b"}
        ], "value"), [
            {value: "a"},
            {value: "b"},
            {value: "h"},
            {value: "z"}
        ], "Array.sortObject");

        t.end();
    });

    test("Array.shuffle", function (t) {

        var shu = Array.shuffle([1, 2, 3]);

        t.deepEqual(shu.length, 3, "Array.shuffle");

        t.deepEqual(shu.sort(), [1, 2, 3], "Array.shuffle");

        t.end();
    });


    test("Array.pad", function (t) {

        var input = [12, 10, 9];

        t.deepEqual(Array.pad(input, 5, 0), [12, 10, 9, 0, 0], "Array.pad");
        t.deepEqual(Array.pad(input, -7, -1), [-1, -1, -1, -1, 12, 10, 9], "Array.pad");
        t.deepEqual(Array.pad(input, 2, "noop"), [12, 10, 9], "Array.pad");

        t.end();
    });



}());