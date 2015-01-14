'use strict';

var test = require('tape');
var cellophane = require('../');

test('unique()', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.unique();
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('defaults to comparing by object value', function(t) {
    var array = [{ foo: 1 }, { foo: 1 }, { foo: 2 }];
    var original = cellophane(array);
    var result = original.unique();
    t.looseEqual(result.array, [{ foo: 1 }, { foo: 2 }]);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 1 }, { foo: 2 }]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('use strict comparison by setting `opts.strict` to `true`', function(t) {
    var array = [{ foo: 1 }, { foo: 1 }, { foo: 2 }];
    var original = cellophane(array);
    var result = original.unique({ strict: true });
    t.looseEqual(result.array, [{ foo: 1 }, { foo: 1 }, { foo: 2 }]);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 1 }, { foo: 2 }]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.end();

});
