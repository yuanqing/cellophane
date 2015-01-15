'use strict';

var test = require('tape');
var cellophane = require('../');

test('reverse()', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var z = { foo: 3 };
    var array = [x, y, z];
    var original = cellophane(array);
    var result = original.reverse();
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], y);
    t.equal(original.array[2], z);
    // result
    t.looseEqual(result.array, [{ foo: 3 }, { foo: 2 }, { foo: 1 }]);
    t.equal(result.array[0], z);
    t.equal(result.array[1], y);
    t.equal(result.array[2], x);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().reverse().array, []);
    t.end();
  });

  t.test('non-empty array', function(t) {
    t.looseEqual(cellophane([1]).reverse().array, [1]);
    t.looseEqual(cellophane([1, 2, 3]).reverse().array, [3, 2, 1]);
    t.end();
  });

});
