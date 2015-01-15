'use strict';

var test = require('tape');
var cellophane = require('../');

test('sort(fn)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var z = { foo: 3 };
    var array = [z, x, y];
    var original = cellophane(array);
    var result = original.sort(function(a, b) {
      return a.foo < b.foo ? -1 : 1;
    });
    // original
    t.looseEqual(original.array, [{ foo: 3 }, { foo: 1 }, { foo: 2 }]);
    t.equal(original.array[0], z);
    t.equal(original.array[1], x);
    t.equal(original.array[2], y);
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
    var result = cellophane().sort(function(a, b) {
      return a < b ? -1 : 1;
    });
    t.looseEqual(result.array, []);
    t.end();
  });

  t.test('ascending order', function(t) {
    var result = cellophane([3, 1, 2]).sort(function(a, b) {
      return a < b ? -1 : 1;
    });
    t.looseEqual(result.array, [1, 2, 3]);
    t.end();
  });

  t.test('descending order', function(t) {
    var result = cellophane([3, 1, 2]).sort(function(a, b) {
      return a < b ? 1 : -1;
    });
    t.looseEqual(result.array, [3, 2, 1]);
    t.end();
  });

});

test('sort(opts)', function(t) {

  t.test('empty array', function(t) {
    var result = cellophane().sort();
    t.looseEqual(result.array, []);
    t.end();
  });

  t.test('ascending order', function(t) {
    var result = cellophane([3, 1, 2]).sort();
    t.looseEqual(result.array, [1, 2, 3]);
    t.end();
  });

  t.test('descending order', function(t) {
    var result = cellophane([3, 1, 2]).sort({ order: 'desc' });
    t.looseEqual(result.array, [3, 2, 1]);
    t.end();
  });

});
