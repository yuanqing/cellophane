'use strict';

var test = require('tape');
var clone = require('clone');
var cellophane = require('../');

test('each(fn)', function(t) {

  t.test('empty array', function(t) {
    var args = [];
    var array = [];
    var original = cellophane(array);
    var result = original.each(function(val, i, array) {
      args.push(clone([val, i, array]));
    });
    t.looseEqual(args, []);
    t.looseEqual(original.array, []);
    t.equal(original, result);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var args = [];
    var original = cellophane([1, 2, 3]);
    var result = original.each(function(val, i, array) {
      args.push(clone([val, i, array]));
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]],
      [3, 2, [1, 2, 3]]
    ]);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original, result);
    t.end();
  });

  t.test('breaks on returning `false`', function(t) {
    var args = [];
    var original = cellophane([1, 2, 3]);
    var result = original.each(function(val, i, array) {
      args.push(clone([val, i, array]));
      if (val === 2) {
        return false;
      }
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]]
    ]);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original, result);
    t.end();
  });

  t.end();

});
