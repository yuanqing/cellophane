'use strict';

var test = require('tape');
var cellophane = require('../');

test('unique()', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.unique();
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var array = [3, 1, 1, 2, 3, 2, 3];
    var original = cellophane(array);
    var result = original.unique();
    t.looseEqual(result.array, [3, 1, 2]);
    t.looseEqual(original.array, [3, 1, 1, 2, 3, 2, 3]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});
