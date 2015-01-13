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

  t.test('defaults to strict comparison', function(t) {
    var obj = { foo: 2 };
    var array = [{ foo: 1 }, obj, { foo: 3 }];
    var original = cellophane(array);
    t.equal(original.indexOf('bar'), -1);
    t.equal(original.indexOf({ foo: 2 }), -1);
    t.equal(original.indexOf(obj), 1);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array, array);
    t.end();
  });

  t.test('coercive comparison if `opts.strict` is `false`', function(t) {
    var obj = { foo: 2 };
    var array = [{ foo: 1 }, obj, { foo: 3 }];
    var original = cellophane(array);
    t.equal(original.indexOf('bar', { strict: false }), -1);
    t.equal(original.indexOf({ foo: 2 }, { strict: false }), 1);
    t.equal(original.indexOf(obj, { strict: false }), 1);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array, array);
    t.end();
  });

  t.end();

});
