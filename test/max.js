'use strict';

var test = require('tape');
var cellophane = require('../');

test('max()', function(t) {

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().max(), undefined);
    t.end();
  });

  t.test('non-empty array', function(t) {
    t.looseEqual(cellophane([2, 1, 3]).max(), 3);
    t.end();
  });

});

test('max(key)', function(t) {

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().max('foo.bar'), undefined);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var obj = { foo: { bar: 3 } };
    t.equal(cellophane([
      { foo: { bar: 2 } },
      { foo: { bar: 1 } },
      obj
    ]).max('foo.bar'), obj);
    t.end();
  });

});
