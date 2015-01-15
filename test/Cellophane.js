'use strict';

var test = require('tape');
var cellophane = require('../');

test('cellophane()', function(t) {

  t.test('creates a cellophane object', function(t) {
    var c = cellophane();
    t.true(c instanceof cellophane);
    t.looseEqual(c.array, []);
    t.end();
  });

});

test('cellophane(array)', function(t) {

  t.test('sets the "internal" array to `array`', function(t) {
    var array = [{ foo: 1 }];
    var c = cellophane(array);
    t.true(c instanceof cellophane);
    t.equal(c.array, array);
    t.end();
  });

  t.test('throws if `array` is not an array', function(t) {
    t.throws(function() {
      cellophane({});
    });
    t.end();
  });

});
