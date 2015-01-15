'use strict';

var test = require('tape');
var cellophane = require('../');

test('removeAt(i)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var z = { foo: 3 };
    var array = [x, y, z];
    var original = cellophane(array);
    var result = original.removeAt(1);
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], y);
    t.equal(original.array[2], z);
    // result
    t.looseEqual(result.array, [{ foo: 1 }, { foo: 3 }]);
    t.equal(result.array[0], x);
    t.equal(result.array[1], z);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('empty array', function(t) {
    var c = cellophane();
    t.looseEqual(c.removeAt(-1).array, []);
    t.looseEqual(c.removeAt(0).array, []);
    t.looseEqual(c.removeAt(1).array, []);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var c = cellophane([1, 2, 3]);
    t.looseEqual(c.removeAt(-4).array, [1, 2, 3]);
    t.looseEqual(c.removeAt(-3).array, [2, 3]);
    t.looseEqual(c.removeAt(-2).array, [1, 3]);
    t.looseEqual(c.removeAt(-1).array, [1, 2]);
    t.looseEqual(c.removeAt(0).array, [2, 3]);
    t.looseEqual(c.removeAt(1).array, [1, 3]);
    t.looseEqual(c.removeAt(2).array, [1, 2]);
    t.looseEqual(c.removeAt(3).array, [1, 2, 3]);
    t.end();
  });

});
