'use strict';

var test = require('tape');
var cellophane = require('../');

test('append(obj)', function(t) {

  t.test('adds `obj` to the end of the array', function(t) {
    var array = [{ foo: 1 }];
    var original = cellophane(array);
    var obj = { foo: 2 };
    var result = original.append(obj);
    t.looseEqual(result.array, [{ foo: 1 }, { foo: 2 }]);
    t.looseEqual(original.array, [{ foo: 1 }]);
    t.equal(result.array[0], original.array[0]);
    t.equal(result.array[1], obj);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});
