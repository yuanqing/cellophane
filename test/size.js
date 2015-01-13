'use strict';

var test = require('tape');
var cellophane = require('../');

test('size()', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    t.equal(original.size(), 0);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var array = [1, 2, 3];
    var original = cellophane(array);
    t.equal(original.size(), 3);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});
