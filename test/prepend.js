'use strict';

var test = require('tape');
var cellophane = require('../');

test('prepend(obj)', function(t) {

  t.test('adds `obj` to the start of the array', function(t) {
    var array = [{ foo: 1 }];
    var original = cellophane(array);
    var obj = { foo: 2 };
    var result = original.prepend(obj);
    t.looseEqual(result.array, [{ foo: 2 }, { foo: 1 }]);
    t.looseEqual(original.array, [{ foo: 1 }]);
    t.equal(result.array[0], obj);
    t.equal(result.array[1], original.array[0]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});
