'use strict';

var test = require('tape');
var clone = require('clone');
var cellophane = require('../');

test('map(fn)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var array = [x, y];
    var original = cellophane(array);
    var result = original.map(function(val) {
      return val;
    });
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], y);
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
    var args = [];
    var result = cellophane().map(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val * 10;
    });
    t.looseEqual(args, []);
    t.looseEqual(result.array, []);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var args = [];
    var result = cellophane([1, 2, 3]).map(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val * 10;
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]],
      [3, 2, [1, 2, 3]]
    ]);
    t.looseEqual(result.array, [10, 20, 30]);
    t.end();
  });

});
