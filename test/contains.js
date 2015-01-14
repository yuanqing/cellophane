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

  t.test('defaults to comparing by object value', function(t) {
    var obj = { foo: 2 };
    var array = [{ foo: 1 }, obj, { foo: 3 }];
    var original = cellophane(array);
    t.equal(original.contains('bar'), false);
    t.equal(original.contains({ foo: 2 }), true);
    t.equal(original.contains(obj), true);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array, array);
    t.end();
  });

  t.test('use strict comparison by setting `opts.strict` to `true`', function(t) {
    var obj = { foo: 2 };
    var array = [{ foo: 1 }, obj, { foo: 3 }];
    var original = cellophane(array);
    t.equal(original.contains('bar', { strict: true }), false);
    t.equal(original.contains({ foo: 2 }, { strict: true }), false);
    t.equal(original.contains(obj, { strict: true }), true);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});
