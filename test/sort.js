'use strict';

var test = require('tape');
var cellophane = require('../');

test('sort(fn)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.sort(function(a, b) {
      return a < b ? -1 : 1;
    });
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('ascending order', function(t) {
    var array = [3, 1, 2];
    var original = cellophane(array);
    var result = original.sort(function(a, b) {
      return a < b ? -1 : 1;
    });
    t.looseEqual(result.array, [1, 2, 3]);
    t.looseEqual(original.array, [3, 1, 2]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('descending order', function(t) {
    var array = [3, 1, 2];
    var original = cellophane(array);
    var result = original.sort(function(a, b) {
      return a > b ? -1 : 1;
    });
    t.looseEqual(result.array, [3, 2, 1]);
    t.looseEqual(original.array, [3, 1, 2]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});

test('sort(opts)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.sort();
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('ascending order', function(t) {
    var array = [3, 1, 2];
    var original = cellophane(array);
    var result = original.sort();
    t.looseEqual(result.array, [1, 2, 3]);
    t.looseEqual(original.array, [3, 1, 2]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('descending order', function(t) {
    var array = [3, 1, 2];
    var original = cellophane(array);
    var result = original.sort({ order: 'desc' });
    t.looseEqual(result.array, [3, 2, 1]);
    t.looseEqual(original.array, [3, 1, 2]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});
