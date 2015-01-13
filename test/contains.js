'use strict';

var test = require('tape');
var cellophane = require('../');

test('contains(obj, opts)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    t.equal(original.contains({ foo: 1 }), false);
    t.equal(original.contains({ foo: 1 }, { strict: false }), false);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  t.test('defaults to strict comparison', function(t) {
    var obj = { foo: 2 };
    var array = [{ foo: 1 }, obj, { foo: 3 }];
    var original = cellophane(array);
    t.equal(original.contains('bar'), false);
    t.equal(original.contains({ foo: 2 }), false);
    t.equal(original.contains(obj), true);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array, array);
    t.end();
  });

  t.test('coercive comparison if `opts.strict` is `false`', function(t) {
    var obj = { foo: 2 };
    var array = [{ foo: 1 }, obj, { foo: 3 }];
    var original = cellophane(array);
    t.equal(original.contains('bar', { strict: false }), false);
    t.equal(original.contains({ foo: 2 }, { strict: false }), true);
    t.equal(original.contains(obj, { strict: false }), true);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});
