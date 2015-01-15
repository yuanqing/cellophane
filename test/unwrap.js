'use strict';

var test = require('tape');
var cellophane = require('../');

test('unwrap()', function(t) {

  t.test('returns a copy of the internal array', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var z = { foo: 3 };
    var array = [x, y, z];
    var original = cellophane(array);
    var result = original.unwrap();
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], y);
    t.equal(original.array[2], z);
    // result
    t.looseEqual(result, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(result[0], x);
    t.equal(result[1], y);
    t.equal(result[2], z);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().unwrap(), []);
    t.end();
  });

  t.test('non-empty array', function(t) {
    t.looseEqual(cellophane([1, 2, 3]).unwrap(), [1, 2, 3]);
    t.end();
  });

});
