'use strict';

var test = require('tape');
var cellophane = require('../');

test('insert(obj, i)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var z = { foo: 3 };
    var array = [x, z];
    var original = cellophane(array);
    var result = original.insert(y, 1);
    // original
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 3 }]);
    t.equal(original.array[0], x);
    t.equal(original.array[1], z);
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
    var c = cellophane();
    t.looseEqual(c.insert('foo', -2).array, ['foo', , ]);
    t.looseEqual(c.insert('foo', -1).array, ['foo', ]);
    t.looseEqual(c.insert('foo', 0).array, ['foo']);
    t.looseEqual(c.insert('foo', 1).array, [ , 'foo']);
    t.looseEqual(c.insert('foo', 2).array, [ , , 'foo']);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var c = cellophane([1, 2, 3]);
    t.looseEqual(c.insert('foo', -6).array, ['foo', , , 1, 2, 3]);
    t.looseEqual(c.insert('foo', -5).array, ['foo', , 1, 2, 3]);
    t.looseEqual(c.insert('foo', -4).array, ['foo', 1, 2, 3]);
    t.looseEqual(c.insert('foo', -3).array, [1, 'foo', 2, 3]);
    t.looseEqual(c.insert('foo', -2).array, [1, 2, 'foo', 3]);
    t.looseEqual(c.insert('foo', -1).array, [1, 2, 3, 'foo']);
    t.looseEqual(c.insert('foo', 0).array, ['foo', 1, 2, 3]);
    t.looseEqual(c.insert('foo', 1).array, [1, 'foo', 2, 3]);
    t.looseEqual(c.insert('foo', 2).array, [1, 2, 'foo', 3]);
    t.looseEqual(c.insert('foo', 3).array, [1, 2, 3, 'foo']);
    t.looseEqual(c.insert('foo', 4).array, [1, 2, 3, , 'foo']);
    t.looseEqual(c.insert('foo', 5).array, [1, 2, 3, , , 'foo']);
    t.end();
  });

});
