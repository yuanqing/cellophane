'use strict';

var test = require('tape');
var clone = require('clone');
var cellophane = require('../');

test('filter(fn)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var array = [x, y];
    var original = cellophane(array);
    var result = original.filter(function(val) {
      return val.foo > 1;
    });
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], y);
    // result
    t.looseEqual(result.array, [{ foo: 2 }]);
    t.equal(result.array[0], y);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('empty array', function(t) {
    var args = [];
    var result = cellophane().filter(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val > 0;
    });
    t.looseEqual(args, []);
    t.looseEqual(result.array, []);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var args = [];
    var result = cellophane([1, 2, 3]).filter(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val > 1;
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]],
      [3, 2, [1, 2, 3]]
    ]);
    t.looseEqual(result.array, [2, 3]);
    t.end();
  });

});

test('filter(op, val)', function(t) {

  t.test('returns a copy', function(t) {
    var original = cellophane([1, 2]);
    var result = original.filter('>', 1);
    // original
    t.looseEqual(original.array, [1, 2]);
    // result
    t.looseEqual(result.array, [2]);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().filter('>', 1).array, []);
    t.end();
  });

  t.test('non-empty array', function(t) {
    t.looseEqual(cellophane([1, 2, 3]).filter('>', 1).array, [2, 3]);
    t.end();
  });

});

test('filter(key, op, val)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var array = [x, y];
    var original = cellophane(array);
    var result = original.filter('foo', '>', 1);
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], y);
    // result
    t.looseEqual(result.array, [{ foo: 2 }]);
    t.equal(result.array[0], y);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().filter('foo.bar', '>', 1).array, []);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var result = cellophane([
      { foo: { bar: 1 } },
      { foo: { bar: 2 } },
      { foo: { bar: 3 } }
    ]).filter('foo.bar', '>', 1);
    t.looseEqual(result.array, [
      { foo: { bar: 2 } },
      { foo: { bar: 3 } }
    ]);
    t.end();
  });

});
