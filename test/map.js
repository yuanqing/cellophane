'use strict';

var test = require('tape');
var clone = require('clone');
var cellophane = require('../');

test('map(fn)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var z = { foo: 3 };
    var array = [x, y, z];
    var original = cellophane(array);
    var result = original.map(function(val) {
      return val;
    });
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], y);
    t.equal(original.array[2], z);
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
