'use strict';

var test = require('tape');
var cellophane = require('../');

test('first()', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    t.equal(original.first(), undefined);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var array = [1, 2, 3];
    var original = cellophane(array);
    t.equal(original.first(), 1);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});

test('first(n)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.first(10);
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('`n` smaller than array size', function(t) {
    var array = [1, 2, 3];
    var original = cellophane(array);
    var result = original.first(2);
    t.looseEqual(result.array, [1, 2]);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('`n` larger than array size', function(t) {
    var array = [1, 2, 3];
    var original = cellophane(array);
    var result = original.first(10);
    t.looseEqual(result.array, [1, 2, 3]);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});
