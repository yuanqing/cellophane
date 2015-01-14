'use strict';

var test = require('tape');
var cellophane = require('../');

test('remove(obj, opts)', function(t) {

  t.test('empty array', function(t) {
    var array = [];
    var original = cellophane(array);
    var result = original.remove({ foo: 1 });
    t.looseEqual(result.array, []);
    t.looseEqual(original.array, []);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('defaults to comparing by object value', function(t) {
    var array = [{ foo: 1 }, { foo: 2 }, { foo: 3 }];
    var original = cellophane(array);
    var result = original.remove({ foo: 2 });
    t.looseEqual(result.array, [{ foo: 1 }, { foo: 3 }]);
    t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
    t.equal(original.array, array);
    t.notEqual(original, result);
    t.notEqual(original.array, result.array);
    t.end();
  });

  t.test('use strict comparison by setting `opts.strict` to `true`', function(t) {

    t.test('`obj` is not removed', function(t) {
      var array = [{ foo: 1 }, { foo: 2 }, { foo: 3 }];
      var original = cellophane(array);
      var result = original.remove({ foo: 2 }, { strict: true });
      t.looseEqual(result.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
      t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.test('`obj` is removed', function(t) {
      var obj = { foo: 2 };
      var array = [{ foo: 1 }, obj, { foo: 3 }];
      var original = cellophane(array);
      var result = original.remove(obj, { strict: true });
      t.looseEqual(result.array, [{ foo: 1 }, { foo: 3 }]);
      t.looseEqual(original.array, [{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
      t.equal(original.array, array);
      t.notEqual(original, result);
      t.notEqual(original.array, result.array);
      t.end();
    });

    t.end();

  });

  t.end();

});
