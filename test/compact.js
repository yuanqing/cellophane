'use strict';

var test = require('tape');
var cellophane = require('../');

test('compact()', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var array = [x, false];
    var original = cellophane(array);
    var result = original.compact();
    // original
    t.looseEqual(original.array, [{ foo: 1 }, false]);
    t.equal(original.array[0], x);
    // result
    t.looseEqual(result.array, [{ foo: 1 }]);
    t.equal(result.array[0], x);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().compact().array, []);
    t.end();
  });

  t.test('non-empty array', function(t) {
    t.looseEqual(cellophane([0, 1, 2, 3]).compact().array, [1, 2, 3]);
    t.end();
  });

});
