'use strict';

var test = require('tape');
var cellophane = require('../');

test('append(obj)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var z = { foo: 3 };
    var array = [x, y];
    var original = cellophane(array);
    var result = original.append(z);
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], y);
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
    t.looseEqual(cellophane().append(1).array, [1]);
    t.end();
  });

  t.test('non-empty array', function(t) {
    t.looseEqual(cellophane([1, 2]).append(3).array, [1, 2, 3]);
    t.end();
  });

});
