'use strict';

var test = require('tape');
var cellophane = require('../');

test('contains(obj, opts)', function(t) {

  t.test('empty array', function(t) {
    t.equal(cellophane().contains({ foo: 3 }), false);
    t.end();
  });

  t.test('defaults to comparing by object value', function(t) {
    var c = cellophane([
      { foo: 1 },
      { foo: 2 },
      { foo: 3 }
    ]);
    t.equal(c.contains({ foo: 3 }), true);
    t.equal(c.contains({ foo: 4 }), false);
    t.end();
  });

  t.test('use strict comparison by setting `opts.strict` to `true`', function(t) {
    var obj = { foo: 3 };
    var c = cellophane([
      { foo: 1 },
      { foo: 2 },
      obj
    ]);
    t.equal(c.contains(obj, { strict: true }), true);
    t.equal(c.contains({ foo: 3 }, { strict: true }), false);
    t.equal(c.contains({ foo: 4 }, { strict: true }), false);
    t.end();
  });

});
