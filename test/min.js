'use strict';

var test = require('tape');
var cellophane = require('../');

test('min()', function(t) {

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().min(), undefined);
    t.end();
  });

  t.test('non-empty array', function(t) {
    t.looseEqual(cellophane([3, 1, 2]).min(), 1);
    t.end();
  });

});

test('min(key)', function(t) {

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().min('foo.bar'), undefined);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var obj = { foo: { bar: 1 } };
    t.equal(cellophane([
      { foo: { bar: 3 } },
      obj,
      { foo: { bar: 2 } }
    ]).min('foo.bar'), obj);
    t.end();
  });

});
