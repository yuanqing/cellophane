'use strict';

var test = require('tape');
var cellophane = require('../');

test('first()', function(t) {

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().first(), undefined);
    t.end();
  });

  t.test('non-empty array', function(t) {
    t.looseEqual(cellophane([1, 2, 3]).first(), 1);
    t.end();
  });

});

test('first(n)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var z = { foo: 3 };
    var array = [x, y, z];
    var original = cellophane(array);
    var result = original.first(2);
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], y);
    t.equal(original.array[2], z);
    // result
    t.looseEqual(result.array, [{ foo: 1 }, { foo: 2 }]);
    t.equal(result.array[0], x);
    t.equal(result.array[1], y);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().first(2).array, []);
    t.end();
  });

  t.test('non-empty array', function(t) {
    t.looseEqual(cellophane([1, 2, 3]).first(2).array, [1, 2]);
    t.end();
  });

});
