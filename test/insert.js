'use strict';

var test = require('tape');
var cellophane = require('../');

test('insert(obj, i)', function(t) {

  t.test('returns a copy', function(t) {
    var x = { foo: 1 };
    var y = { foo: 2 };
    var array = [x];
    var original = cellophane(array);
    var result = original.add(y);
    // original
    t.looseEqual(original.array, [{ foo: 1 }]);
    t.equal(original.array[0], x);
    // result
    t.looseEqual(result.array, [{ foo: 1 }, { foo: 2 }]);
    t.equal(result.array[0], x);
    t.equal(result.array[1], y);
    // original !== result
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('insert into empty array', function(t) {
    var c = cellophane([]);
    var x = 'foo';
    t.looseEqual(c.insert(x, -2).array, [x, , ]);
    t.looseEqual(c.insert(x, -1).array, [x, ]);
    t.looseEqual(c.insert(x, 0).array, [x]);
    t.looseEqual(c.insert(x, 1).array, [ , x]);
    t.looseEqual(c.insert(x, 2).array, [ , , x]);
    t.end();
  });

  t.test('insert into non-empty array', function(t) {
    var c = cellophane([1, 2, 3]);
    var x = 'foo';
    t.looseEqual(c.insert(x, -6).array, [x, , , 1, 2, 3]);
    t.looseEqual(c.insert(x, -5).array, [x, , 1, 2, 3]);
    t.looseEqual(c.insert(x, -4).array, [x, 1, 2, 3]);
    t.looseEqual(c.insert(x, -3).array, [1, x, 2, 3]);
    t.looseEqual(c.insert(x, -2).array, [1, 2, x, 3]);
    t.looseEqual(c.insert(x, -1).array, [1, 2, 3, x]);
    t.looseEqual(c.insert(x, 0).array, [x, 1, 2, 3]);
    t.looseEqual(c.insert(x, 1).array, [1, x, 2, 3]);
    t.looseEqual(c.insert(x, 2).array, [1, 2, x, 3]);
    t.looseEqual(c.insert(x, 3).array, [1, 2, 3, x]);
    t.looseEqual(c.insert(x, 4).array, [1, 2, 3, , x]);
    t.looseEqual(c.insert(x, 5).array, [1, 2, 3, , , x]);
    t.end();
  });

});
