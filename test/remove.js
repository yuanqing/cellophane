'use strict';

var test = require('tape');
var cellophane = require('../');

test('remove(obj, opts)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var array = [x, y];
    var original = cellophane(array);
    var result = original.remove({ foo: 2 });
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], y);
    // result
    t.looseEqual(result.array, [{ foo: 1 }]);
    t.equal(result.array[0], x);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('empty array', function(t) {
    t.looseEqual(cellophane().remove({ foo: 3 }).array, []);
    t.end();
  });

  t.test('defaults to comparing by object value', function(t) {
    var result = cellophane([
      { foo: 1 },
      { foo: 2 },
      { foo: 3 }
    ]).remove({ foo: 3 });
    t.looseEqual(result.array, [
      { foo: 1 },
      { foo: 2 }
    ]);
    t.end();
  });

  t.test('use strict comparison by setting `opts.strict` to `true`', function(t) {

    t.test('`obj` is not removed', function(t) {
      var result = cellophane([
        { foo: 1 },
        { foo: 2 },
        { foo: 3 }
      ]).remove({ foo: 3 }, { strict: true });
      t.looseEqual(result.array, [
        { foo: 1 },
        { foo: 2 },
        { foo: 3 }
      ]);
      t.end();
    });

    t.test('`obj` is removed', function(t) {
      var obj = { foo: 3 };
      var result = cellophane([
        { foo: 1 },
        { foo: 2 },
        obj
      ]).remove(obj, { strict: true });
      t.looseEqual(result.array, [
        { foo: 1 },
        { foo: 2 }
      ]);
      t.end();
    });

  });

});
