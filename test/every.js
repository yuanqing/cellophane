'use strict';

var test = require('tape');
var clone = require('clone');
var cellophane = require('../');

test('every(fn)', function(t) {

  t.test('empty array', function(t) {
    var args = [];
    var array = [];
    var original = cellophane(array);
    var result = original.every(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val < 3;
    });
    t.looseEqual(args, []);
    t.equal(result, true);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  t.test('false result', function(t) {
    var args = [];
    var array = [1, 2, 3];
    var original = cellophane(array);
    var result = original.every(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val < 3;
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]],
      [3, 2, [1, 2, 3]]
    ]);
    t.equal(result, false);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.end();
  });

  t.test('true result', function(t) {
    var args = [];
    var array = [1, 2, 3];
    var original = cellophane(array);
    var result = original.every(function(val, i, array) {
      args.push(clone([val, i, array]));
      return val > 0;
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]],
      [3, 2, [1, 2, 3]]
    ]);
    t.equal(result, true);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});

test('every(op, val)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.every('<', 3);
    t.equal(result, true);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  t.test('false result', function(t) {
    var array = [1, 2, 3];
    var original = cellophane(array);
    var result = original.every('<', 3);
    t.equal(result, false);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.end();
  });

  t.test('true result', function(t) {
    var array = [1, 2, 3];
    var original = cellophane(array);
    var result = original.every('>', 0);
    t.equal(result, true);
    t.looseEqual(original.array, [1, 2, 3]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});

test('every(key, op, val)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.every('foo.bar', '<', 3);
    t.equal(result, true);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  t.test('false result', function(t) {
    var array = [
      { foo: { bar: 1 } },
      { foo: { bar: 2 } },
      { foo: { bar: 3 } }
    ];
    var original = cellophane(array);
    var result = original.every('foo.bar', '<', 3);
    t.equal(result, false);
    t.looseEqual(original.array, [
      { foo: { bar: 1 } },
      { foo: { bar: 2 } },
      { foo: { bar: 3 } }
    ]);
    t.equal(original.array, array);
    t.end();
  });

  t.test('true result', function(t) {
    var array = [
      { foo: { bar: 1 } },
      { foo: { bar: 2 } },
      { foo: { bar: 3 } }
    ];
    var original = cellophane(array);
    var result = original.every('foo.bar', '>', 0);
    t.equal(result, true);
    t.looseEqual(original.array, [
      { foo: { bar: 1 } },
      { foo: { bar: 2 } },
      { foo: { bar: 3 } }
    ]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});
