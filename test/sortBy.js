'use strict';

var test = require('tape');
var cellophane = require('../');

test('sortBy(key, opts)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var z = { foo: 3 };
    var array = [z, x, y];
    var original = cellophane(array);
    var result = original.sortBy('foo');
    // original
    t.looseEqual(original.array, [{ foo: 3 }, { foo: 1 }, { foo: 2 }]);
    t.equal(original.array[0], z);
    t.equal(original.array[1], x);
    t.equal(original.array[2], y);
    // result
    t.looseEqual(result.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(result.array[0], x);
    t.equal(result.array[1], y);
    t.equal(result.array[2], z);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('empty array', function(t) {
    var result = cellophane().sortBy('foo.bar');
    t.looseEqual(result.array, []);
    t.end();
  });

  t.test('sort by a numeric value', function(t) {

    t.test('ascending order', function(t) {
      var result = cellophane([
        { foo: { bar: 3 } },
        { foo: { bar: 1 } },
        { foo: { bar: 2 } }
      ]).sortBy('foo.bar');
      t.looseEqual(result.array, [
        { foo: { bar: 1 } },
        { foo: { bar: 2 } },
        { foo: { bar: 3 } }
      ]);
      t.end();
    });

    t.test('descending order', function(t) {
      var result = cellophane([
        { foo: { bar: 3 } },
        { foo: { bar: 1 } },
        { foo: { bar: 2 } }
      ]).sortBy('foo.bar', { order: 'desc' });
      t.looseEqual(result.array, [
        { foo: { bar: 3 } },
        { foo: { bar: 2 } },
        { foo: { bar: 1 } }
      ]);
      t.end();
    });

  });

  t.test('sort by a string value', function(t) {

    t.test('ascending order', function(t) {
      var result = cellophane([
        { foo: { bar: 'c' } },
        { foo: { bar: 'a' } },
        { foo: { bar: 'b' } }
      ]).sortBy('foo.bar');
      t.looseEqual(result.array, [
        { foo: { bar: 'a' } },
        { foo: { bar: 'b' } },
        { foo: { bar: 'c' } }
      ]);
      t.end();
    });

    t.test('descending order', function(t) {
      var result = cellophane([
        { foo: { bar: 'c' } },
        { foo: { bar: 'a' } },
        { foo: { bar: 'b' } }
      ]).sortBy('foo.bar', { order: 'desc' });
      t.looseEqual(result.array, [
        { foo: { bar: 'c' } },
        { foo: { bar: 'b' } },
        { foo: { bar: 'a' } }
      ]);
      t.end();
    });

  });

});
