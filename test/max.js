'use strict';

var test = require('tape');
var cellophane = require('../');

test('max()', function(t) {

  test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.max();
    t.looseEqual(result, undefined);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  test('non-empty array', function(t) {
    var array = [2, 1, 3];
    var original = cellophane(array);
    var result = original.max();
    t.looseEqual(result, 3);
    t.looseEqual(original.array, [2, 1, 3]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});

test('max(key)', function(t) {

  test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.max('foo.bar');
    t.looseEqual(result, undefined);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  test('non-empty array', function(t) {
    var obj = { foo: { bar: 3 } };
    var array = [
      { foo: { bar: 2 } },
      { foo: { bar: 1 } },
      obj
    ];
    var original = cellophane(array);
    var result = original.max('foo.bar');
    t.looseEqual(result, obj);
    t.looseEqual(original.array, [
      { foo: { bar: 2 } },
      { foo: { bar: 1 } },
      { foo: { bar: 3 } }
    ]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});
