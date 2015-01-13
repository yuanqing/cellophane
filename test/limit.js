'use strict';

var test = require('tape');
var cellophane = require('../');

test('limit(n)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.limit(5);
    t.looseEqual(original.array, []);
    t.looseEqual(result.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('limit from start of the array', function(t) {

    t.test('limit is smaller than the array size', function(t) {
      var array = [1, 2, 3];
      var original = cellophane(array);
      var result = original.limit(2);
      t.looseEqual(original.array, [1, 2, 3]);
      t.looseEqual(result.array, [1, 2]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.test('limit is larger than the array size', function(t) {
      var array = [1, 2, 3];
      var original = cellophane(array);
      var result = original.limit(10);
      t.looseEqual(original.array, [1, 2, 3]);
      t.looseEqual(result.array, [1, 2, 3]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.end();

  });

  t.test('limit from end of the array', function(t) {

    t.test('limit is smaller than the array size', function(t) {
      var array = [1, 2, 3];
      var original = cellophane(array);
      var result = original.limit(-2);
      t.looseEqual(original.array, [1, 2, 3]);
      t.looseEqual(result.array, [2, 3]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.test('limit is larger than the array size', function(t) {
      var array = [1, 2, 3];
      var original = cellophane(array);
      var result = original.limit(-10);
      t.looseEqual(original.array, [1, 2, 3]);
      t.looseEqual(result.array, [1, 2, 3]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.end();

  });

  t.end();

});
