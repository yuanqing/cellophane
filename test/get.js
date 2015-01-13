'use strict';

var test = require('tape');
var cellophane = require('../');

test('get(i)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    t.equal(original.get(0), undefined);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  t.test('get from start of array', function(t) {
    var array = [1, 2, 3];
    var original = cellophane(array);
    t.equal(original.get(0), 1);
    t.equal(original.get(1), 2);
    t.equal(original.get(2), 3);
    t.equal(original.get(3), undefined);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.end();
  });

  t.test('get from end of array', function(t) {
    var array = [1, 2, 3];
    var original = cellophane(array);
    t.equal(original.get(-1), 3);
    t.equal(original.get(-2), 2);
    t.equal(original.get(-3), 1);
    t.equal(original.get(-4), undefined);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});
