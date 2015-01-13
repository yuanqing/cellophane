'use strict';

var test = require('tape');
var clone = require('clone');
var cellophane = require('../');

test('fold(fn, acc)', function(t) {

  t.test('`acc` is a non-array', function(t) {

    t.test('empty array', function(t) {
      var args = [];
      var array = [];
      var original = cellophane(array);
      var result = original.fold(function(acc, val, i, array) {
        args.push(clone([acc, val, i, array]));
        return acc + val;
      }, 0);
      t.looseEqual(args, []);
      t.looseEqual(result, 0);
      t.looseEqual(original.array, []);
      t.equal(original.array, array);
      t.end();
    });

    t.test('returns the accumulated value', function(t) {
      var args = [];
      var array = [1, 2, 3];
      var original = cellophane(array);
      var result = original.fold(function(acc, val, i, array) {
        args.push(clone([acc, val, i, array]));
        return acc + val;
      }, 0);
      t.looseEqual(args, [
        [0, 1, 0, [1, 2, 3]],
        [1, 2, 1, [1, 2, 3]],
        [3, 3, 2, [1, 2, 3]]
      ]);
      t.looseEqual(result, 6);
      t.looseEqual(original.array, [1, 2, 3]);
      t.equal(original.array, array);
      t.end();
    });

    t.end();

  });

  t.test('`acc` is an array', function(t) {

    t.test('empty array', function(t) {
      var args = [];
      var array = [];
      var original = cellophane(array);
      var acc = [];
      var result = original.fold(function(acc, val, i, array) {
        args.push(clone([acc, val, i, array]));
        acc.push(val * 10);
        return acc;
      }, acc);
      t.looseEqual(args, []);
      t.true(result instanceof cellophane);
      t.looseEqual(result.array, []);
      t.equal(result.array, acc);
      t.looseEqual(original.array, []);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.test('returns a cellophane object', function(t) {
      var args = [];
      var array = [1, 2, 3];
      var original = cellophane(array);
      var acc = [];
      var result = original.fold(function(acc, val, i, array) {
        args.push(clone([acc, val, i, array]));
        acc.push(val * 10);
        return acc;
      }, acc);
      t.looseEqual(args, [
        [[], 1, 0, [1, 2, 3]],
        [[10], 2, 1, [1, 2, 3]],
        [[10, 20], 3, 2, [1, 2, 3]]
      ]);
      t.true(result instanceof cellophane);
      t.looseEqual(result.array, [10, 20, 30]);
      t.equal(result.array, acc);
      t.looseEqual(original.array, [1, 2, 3]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.end();

  });

  t.end();

});
