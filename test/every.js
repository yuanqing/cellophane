'use strict';

var test = require('tape');
var clone = require('clone');
var cellophane = require('../');

test('every(fn)', function(t) {

  t.test('empty array', function(t) {
    var args = [];
    var result = cellophane().every(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val < 4;
    });
    t.looseEqual(args, []);
    t.equal(result, true);
    t.end();
  });

  t.test('false result', function(t) {
    var args = [];
    var result = cellophane([1, 2, 3]).every(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val < 3;
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]],
      [3, 2, [1, 2, 3]]
    ]);
    t.equal(result, false);
    t.end();
  });

  t.test('true result', function(t) {
    var args = [];
    var result = cellophane([1, 2, 3]).every(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val < 4;
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]],
      [3, 2, [1, 2, 3]]
    ]);
    t.equal(result, true);
    t.end();
  });

});

test('every(op, val)', function(t) {

  t.test('empty array', function(t) {
    t.equal(cellophane().every('<', 4), true);
    t.end();
  });

  t.test('false result', function(t) {
    t.equal(cellophane([1, 2, 3]).every('<', 3), false);
    t.end();
  });

  t.test('true result', function(t) {
    t.equal(cellophane([1, 2, 3]).every('<', 4), true);
    t.end();
  });

});

test('every(key, op, val)', function(t) {

  t.test('empty array', function(t) {
    t.equal(cellophane().every('foo.bar', '<', 4), true);
    t.end();
  });

  t.test('false result', function(t) {
    t.equal(cellophane([
      { foo: { bar: 1 } },
      { foo: { bar: 2 } },
      { foo: { bar: 3 } }
    ]).every('foo.bar', '<', 3), false);
    t.end();
  });

  t.test('true result', function(t) {
    t.equal(cellophane([
      { foo: { bar: 1 } },
      { foo: { bar: 2 } },
      { foo: { bar: 3 } }
    ]).every('foo.bar', '<', 4), true);
    t.end();
  });

});
