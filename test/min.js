'use strict';

var test = require('tape');
var cellophane = require('../');

test('min()', function(t) {

  test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.min();
    t.looseEqual(result, undefined);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  test('non-empty array', function(t) {
    var array = [2, 1, 3];
    var original = cellophane(array);
    var result = original.min();
    t.looseEqual(result, 1);
    t.looseEqual(original.array, [2, 1, 3]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});

test('min(key)', function(t) {

  test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.min('foo.bar');
    t.looseEqual(result, undefined);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  test('non-empty array', function(t) {
    var obj = { foo: { bar: 1 } };
    var array = [
      { foo: { bar: 2 } },
      obj,
      { foo: { bar: 3 } }
    ];
    var original = cellophane(array);
    var result = original.min('foo.bar');
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
