'use strict';

var test = require('tape');
var cellophane = require('../');

test('insert(obj, i)', function(t) {

  t.test('positive `i`', function(t) {
    var array = [{ foo: 1 }, { foo: 2 }];
    var original = cellophane(array);
    var obj = { foo: 3 };
    var result = original.insert(obj, 1);
    t.looseEqual(result.array, [{ foo: 1 }, { foo: 3 }, { foo: 2 }]);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }]);
    t.equal(result.array[0], original.array[0]);
    t.equal(result.array[1], obj);
    t.equal(result.array[2], original.array[1]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('negative `i`', function(t) {
    var array = [{ foo: 1 }, { foo: 2 }];
    var original = cellophane(array);
    var obj = { foo: 3 };
    var result = original.insert(obj, -3);
    t.looseEqual(result.array, [{ foo: 3 }, { foo: 1 }, { foo: 2 }]);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }]);
    t.equal(result.array[0], obj);
    t.equal(result.array[1], original.array[0]);
    t.equal(result.array[2], original.array[1]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});
