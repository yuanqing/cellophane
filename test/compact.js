'use strict';

var test = require('tape');
var cellophane = require('../');

test('compact()', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.compact();
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var array = [1, null, 2, false, 3];
    var original = cellophane(array);
    var result = original.compact();
    t.looseEqual(result.array, [1, 2, 3]);
    t.looseEqual(original.array, [1, null, 2, false, 3]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});
