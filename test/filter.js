'use strict';

var test = require('tape');
var clone = require('clone');
var cellophane = require('../');

test('filter(fn)', function(t) {

  t.test('empty array', function(t) {
    var args = [];
    var array = [];
    var original = cellophane(array);
    var result = original.filter(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val > 1;
    });
    t.looseEqual(args, []);
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('filter using `fn`', function(t) {
    var args = [];
    var array = [1, 2, 3];
    var original = cellophane(array);
    var result = original.filter(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val > 1;
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]],
      [3, 2, [1, 2, 3]]
    ]);
    t.looseEqual(result.array, [2, 3]);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});

test('filter(op, val)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.filter('>', 1);
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('filter on `val`', function(t) {
    var array = [1, 2, 3];
    var original = cellophane(array);
    var result = original.filter('>', 1);
    t.looseEqual(result.array, [2, 3]);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});

test('filter(key, op, val)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.filter('foo.bar', '>', 1);
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('filter on `val` corresponding to `key`', function(t) {
    var array = [
      { foo: { bar: 1 } },
      { foo: { bar: 2 } },
      { foo: { bar: 3 } }
    ];
    var original = cellophane(array);
    var result = original.filter('foo.bar', '>', 1);
    t.looseEqual(result.array, [
      { foo: { bar: 2 } },
      { foo: { bar: 3 } }
    ]);
    t.looseEqual(original.array, [
      { foo: { bar: 1 } },
      { foo: { bar: 2 } },
      { foo: { bar: 3 } }
    ]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});
