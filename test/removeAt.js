'use strict';

var test = require('tape');
var cellophane = require('../');

test('removeAt(i)', function(t) {

  t.test('positive `i`', function(t) {

    t.test('within array bounds', function(t) {
      var array = [1, 2, 3];
      var original = cellophane(array);
      var result = original.removeAt(1);
      t.looseEqual(result.array, [1, 3]);
      t.looseEqual(original.array, [1, 2, 3]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.test('outside array bounds', function(t) {
      var array = [1, 2, 3];
      var original = cellophane(array);
      var result = original.removeAt(3);
      t.looseEqual(result.array, [1, 2, 3]);
      t.looseEqual(original.array, [1, 2, 3]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

  });

  t.test('negative `i`', function(t) {

    t.test('within array bounds', function(t) {
      var array = [1, 2, 3];
      var original = cellophane(array);
      var result = original.removeAt(-3);
      t.looseEqual(result.array, [2, 3]);
      t.looseEqual(original.array, [1, 2, 3]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.test('outside array bounds', function(t) {
      var array = [1, 2, 3];
      var original = cellophane(array);
      var result = original.removeAt(-4);
      t.looseEqual(result.array, [1, 2, 3]);
      t.looseEqual(original.array, [1, 2, 3]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

  });

});
