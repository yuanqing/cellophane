'use strict';

var test = require('tape');
var cellophane = require('../');

test('indexOf(obj, opts)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    t.equal(original.indexOf({ foo: 1 }), -1);
    t.equal(original.indexOf({ foo: 1 }, { strict: false }), -1);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.end();
  });

  t.test('defaults to comparing by object value', function(t) {
    var obj = { foo: 2 };
    var array = [{ foo: 1 }, obj, { foo: 3 }];
    var original = cellophane(array);
    t.equal(original.indexOf('bar'), -1);
    t.equal(original.indexOf({ foo: 2 }), 1);
    t.equal(original.indexOf(obj), 1);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array, array);
    t.end();
  });

  t.test('use strict comparison by setting `opts.strict` to `true`', function(t) {
    var obj = { foo: 2 };
    var array = [{ foo: 1 }, obj, { foo: 3 }];
    var original = cellophane(array);
    t.equal(original.indexOf('bar', { strict: true }), -1);
    t.equal(original.indexOf({ foo: 2 }, { strict: true }), -1);
    t.equal(original.indexOf(obj, { strict: true }), 1);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});
