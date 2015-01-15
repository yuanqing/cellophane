'use strict';

var test = require('tape');
var cellophane = require('../');

test('prepend(obj)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var z = { foo: 3 };
    var array = [y, z];
    var original = cellophane(array);
    var result = original.prepend(x);
    // original
    t.looseEqual(original.array, [{ foo: 2 }, { foo: 3 }]);
    t.equal(original.array[0], y);
    t.equal(original.array[1], z);
    // result
    t.looseEqual(result.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(result.array[0], x);
    t.equal(result.array[1], y);
    t.equal(result.array[2], z);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().prepend(1).array, [1]);
    t.end();
  });

  t.test('non-empty array', function(t) {
    t.looseEqual(cellophane([2, 3]).prepend(1).array, [1, 2, 3]);
    t.end();
  });

});
