'use strict';

var test = require('tape');
var cellophane = require('../');

test('new cellophane(array)', function(t) {

  t.test('creates a cellophane object', function(t) {
    var c = new cellophane([]);
    t.true(c instanceof cellophane);
    t.end();
  });

  t.test('throws if not passed an array', function(t) {
    t.throws(function() {
      new cellophane({});
    });
    t.end();
  });

  t.end();

});

test('cellophane(array)', function(t) {

  t.test('creates a cellophane object', function(t) {
    var c = cellophane([]);
    t.true(c instanceof cellophane);
    t.end();
  });

  t.test('throws if not passed an array', function(t) {
    t.throws(function() {
      cellophane({});
    });
    t.end();
  });

  t.end();

});
