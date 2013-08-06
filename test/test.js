(function () {
    "use strict";

    require("../index.js");
    var tap = require("tap"),
        test = tap.test;


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
        t.deepEqual(Array.add(ar, ar2, ar3), [1, 2, 3, 4, 5, 6, 7, 8, 9], "add three arrays");

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


}());