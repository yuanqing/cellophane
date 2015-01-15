'use strict';

var test = require('tape');
var clone = require('clone');
var cellophane = require('../');

test('foldRight(fn, acc)', function(t) {

  t.test('`acc` is a non-array', function(t) {

    t.test('empty array', function(t) {
      var args = [];
      var result = cellophane().foldRight(function(acc, val, i, array) {
        args.push(clone([acc, val, i, array]));
        return acc + val;
      }, 0);
      t.looseEqual(args, []);
      t.looseEqual(result, 0);
      t.end();
    });

    t.test('non-empty array', function(t) {
      var args = [];
      var result = cellophane([1, 2, 3]).foldRight(function(acc, val, i, array) {
        args.push(clone([acc, val, i, array]));
        return acc + val;
      }, 0);
      t.looseEqual(args, [
        [0, 3, 2, [1, 2, 3]],
        [3, 2, 1, [1, 2, 3]],
        [5, 1, 0, [1, 2, 3]]
      ]);
      t.looseEqual(result, 6);
      t.end();
    });

  });

  t.test('`acc` is an array', function(t) {

    t.test('returns `acc` as a Cellophane object', function(t) {
      var acc = [];
      var result = cellophane([1, 2, 3]).foldRight(function(acc) {
        return acc;
      }, acc);
      t.true(result instanceof cellophane);
      t.equal(result.array, acc);
      t.end();
    });

    t.test('empty array', function(t) {
      var args = [];
      var result = cellophane().foldRight(function(acc, val, i, array) {
        args.push(clone([acc, val, i, array]));
        acc.push(val * 10);
        return acc;
      }, []);
      t.looseEqual(args, []);
      t.looseEqual(result.array, []);
      t.end();
    });

    t.test('non-empty array', function(t) {
      var args = [];
      var result = cellophane([1, 2, 3]).foldRight(function(acc, val, i, array) {
        args.push(clone([acc, val, i, array]));
        acc.push(val * 10);
        return acc;
      }, []);
      t.looseEqual(args, [
        [[], 3, 2, [1, 2, 3]],
        [[30], 2, 1, [1, 2, 3]],
        [[30, 20], 1, 0, [1, 2, 3]]
      ]);
      t.looseEqual(result.array, [30, 20, 10]);
      t.end();
    });

  });

});
