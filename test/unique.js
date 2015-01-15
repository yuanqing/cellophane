'use strict';

var test = require('tape');
var cellophane = require('../');

test('unique(opts)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var z = { foo: 3 };
    var dup = { foo: 1 };
    var array = [x, y, z, dup];
    var original = cellophane(array);
    var result = original.unique();
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }, { foo: 1 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], y);
    t.equal(original.array[2], z);
    t.equal(original.array[3], dup);
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
    t.looseEqual(cellophane().unique().array, []);
    t.end();
  });

  t.test('defaults to comparing by object value', function(t) {
    var result = cellophane([
      { foo: 1 },
      { foo: 2 },
      { foo: 3 },
      { foo: 1 }
    ]).unique();
    t.looseEqual(result.array, [
      { foo: 1 },
      { foo: 2 },
      { foo: 3 }
    ]);
    t.end();
  });

  t.test('use strict comparison by setting `opts.strict` to `true`', function(t) {

    t.test('array contains duplicates of object with the same value', function(t) {
      var result = cellophane([
        { foo: 1 },
        { foo: 2 },
        { foo: 3 },
        { foo: 1 }
      ]).unique({ strict: true });
      t.looseEqual(result.array, [
        { foo: 1 },
        { foo: 2 },
        { foo: 3 },
        { foo: 1 }
      ]);
      t.end();
    });

    t.test('array contains duplicates of the same object', function(t) {
      var obj = { foo: 1 };
      var result = cellophane([
        obj,
        { foo: 2 },
        { foo: 3 },
        obj
      ]).unique({ strict: true });
      t.looseEqual(result.array, [
        { foo: 1 },
        { foo: 2 },
        { foo: 3 }
      ]);
      t.equal(result.array[0], obj);
      t.end();
    });

  });

});
