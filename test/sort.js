'use strict';

var test = require('tape');
var cellophane = require('../');

test('sort(fn)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.sort(function(x, y) {
      return x > y;
    });
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('ascending order', function(t) {
    var array = [3, 1, 2];
    var original = cellophane(array);
    var result = original.sort(function(x, y) {
      return x > y;
    });
    t.looseEqual(result.array, [1, 2, 3]);
    t.looseEqual(original.array, [3, 1, 2]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('descending order', function(t) {
    var array = [3, 1, 2];
    var original = cellophane(array);
    var result = original.sort(function(x, y) {
      return y > x;
    });
    t.looseEqual(result.array, [3, 2, 1]);
    t.looseEqual(original.array, [3, 1, 2]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});

test('sort(key, order)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.sort('foo.bar');
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('sort on a numeric value', function(t) {

    t.test('ascending order', function(t) {
      var array = [
        { foo: { bar: 3 } },
        { foo: { bar: 1 } },
        { foo: { bar: 2 } }
      ];
      var original = cellophane(array);
      var result = original.sort('foo.bar');
      t.looseEqual(result.array, [
        { foo: { bar: 1 } },
        { foo: { bar: 2 } },
        { foo: { bar: 3 } }
      ]);
      t.looseEqual(original.array, [
        { foo: { bar: 3 } },
        { foo: { bar: 1 } },
        { foo: { bar: 2 } }
      ]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.test('descending order', function(t) {
      var array = [
        { foo: { bar: 3 } },
        { foo: { bar: 1 } },
        { foo: { bar: 2 } }
      ];
      var original = cellophane(array);
      var result = original.sort('foo.bar', 'desc');
      t.looseEqual(result.array, [
        { foo: { bar: 3 } },
        { foo: { bar: 2 } },
        { foo: { bar: 1 } }
      ]);
      t.looseEqual(original.array, [
        { foo: { bar: 3 } },
        { foo: { bar: 1 } },
        { foo: { bar: 2 } }
      ]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.end();

  });

  t.test('sort on a string value', function(t) {

    t.test('ascending order', function(t) {
      var array = [
        { foo: { bar: 'c' } },
        { foo: { bar: 'a' } },
        { foo: { bar: 'b' } }
      ];
      var original = cellophane(array);
      var result = original.sort('foo.bar');
      t.looseEqual(result.array, [
        { foo: { bar: 'a' } },
        { foo: { bar: 'b' } },
        { foo: { bar: 'c' } }
      ]);
      t.looseEqual(original.array, [
        { foo: { bar: 'c' } },
        { foo: { bar: 'a' } },
        { foo: { bar: 'b' } }
      ]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.test('descending order', function(t) {
      var array = [
        { foo: { bar: 'c' } },
        { foo: { bar: 'a' } },
        { foo: { bar: 'b' } }
      ];
      var original = cellophane(array);
      var result = original.sort('foo.bar', 'desc');
      t.looseEqual(result.array, [
        { foo: { bar: 'c' } },
        { foo: { bar: 'b' } },
        { foo: { bar: 'a' } }
      ]);
      t.looseEqual(original.array, [
        { foo: { bar: 'c' } },
        { foo: { bar: 'a' } },
        { foo: { bar: 'b' } }
      ]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.end();

  });

  t.end();

});
