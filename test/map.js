'use strict';

var test = require('tape');
var clone = require('clone');
var cellophane = require('../');

test('map(fn)', function(t) {

  t.test('empty array', function(t) {
    var args = [];
    var array = [];
    var original = cellophane(array);
    var result = original.map(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val * 10;
    });
    t.looseEqual(args, []);
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var args = [];
    var array = [1, 2, 3];
    var original = cellophane(array);
    var result = original.map(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val * 10;
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]],
      [3, 2, [1, 2, 3]]
    ]);
    t.looseEqual(result.array, [10, 20, 30]);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});
