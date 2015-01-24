'use strict';

var test = require('tape');
var cellophane = require('../');

test('indexOf(obj, opts)', function(t) {

  t.test('empty array', function(t) {
    t.equal(cellophane().indexOf({ foo: 3 }), -1);
    t.end();
  });

  t.test('returns the index of the first instance of `obj` in the array', function(t) {
    var c = cellophane([
      { foo: 1 },
      { foo: 2 },
      { foo: 2 },
      { foo: 3 }
    ]);
    t.equal(c.indexOf({ foo: 2 }), 1);
    t.end();
  });

  t.test('defaults to comparing by object value', function(t) {
    var c = cellophane([
      { foo: 1 },
      { foo: 2 },
      { foo: 3 }
    ]);
    t.equal(c.indexOf({ foo: 3 }), 2);
    t.equal(c.indexOf({ foo: 4 }), -1);
    t.end();
  });

  t.test('use strict comparison by setting `opts.strict` to `true`', function(t) {
    var obj = { foo: 3 };
    var c = cellophane([
      { foo: 1 },
      { foo: 2 },
      obj
    ]);
    t.equal(c.indexOf(obj, { strict: true }), 2);
    t.equal(c.indexOf({ foo: 3 }, { strict: true }), -1);
    t.equal(c.indexOf({ foo: 4 }, { strict: true }), -1);
    t.end();
  });

});
