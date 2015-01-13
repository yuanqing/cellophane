'use strict';

var test = require('tape');
var cellophane = require('../');

test('slice(i, j)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.slice(1, 2);
    t.looseEqual(original.array, []);
    t.looseEqual(result.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('slices the array', function(t) {
    var array = [1, 2, 3];
    var original = cellophane(array);
    var result = original.slice(1, 2);
    t.looseEqual(original.array, [1, 2, 3]);
    t.looseEqual(result.array, [2]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});
