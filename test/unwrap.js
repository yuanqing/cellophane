'use strict';

var test = require('tape');
var cellophane = require('../');

test('unwrap()', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.unwrap();
    t.looseEqual(result, []);
    t.looseEqual(original.array, []);
    t.notEqual(original.array, result);
    t.equal(original.array, array);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var array = [1, 2, 3];
    var original = cellophane(array);
    var result = original.unwrap();
    t.looseEqual(result, [1, 2, 3]);
    t.looseEqual(original.array, [1, 2, 3]);
    t.notEqual(original.array, result);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});
