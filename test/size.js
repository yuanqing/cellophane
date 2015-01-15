'use strict';

var test = require('tape');
var cellophane = require('../');

test('size()', function(t) {

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().size(), 0);
    t.end();
  });

  t.test('non-empty array', function(t) {
    t.looseEqual(cellophane([1, 2, 3]).size(), 3);
    t.end();
  });

});
