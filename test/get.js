'use strict';

var test = require('tape');
var cellophane = require('../');

test('get(i)', function(t) {

  t.test('empty array', function(t) {
    var c = cellophane();
    t.looseEqual(c.get(-1), undefined);
    t.looseEqual(c.get(0), undefined);
    t.looseEqual(c.get(1), undefined);
    t.end();
  });

  t.test('positive `i`', function(t) {
    var c = cellophane([1, 2, 3]);
    t.equal(c.get(0), 1);
    t.equal(c.get(1), 2);
    t.equal(c.get(2), 3);
    t.equal(c.get(3), undefined);
    t.end();
  });

  t.test('negative `i`', function(t) {
    var c = cellophane([1, 2, 3]);
    t.equal(c.get(-1), 3);
    t.equal(c.get(-2), 2);
    t.equal(c.get(-3), 1);
    t.equal(c.get(-4), undefined);
    t.end();
  });

});
