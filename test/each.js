'use strict';

var test = require('tape');
var clone = require('clone');
var cellophane = require('../');

test('each(fn)', function(t) {

  t.test('returns the original object', function(t) {
    var original = cellophane([1, 2, 3]);
    t.equal(original, original.each(function() {}));
    t.end();
  });

  t.test('empty array', function(t) {
    var args = [];
    cellophane().each(function(val, i, array) {
      args.push(clone([val, i, array]));
    });
    t.looseEqual(args, []);
    t.end();
  });

  t.test('non-empty array', function(t) {
    var args = [];
    cellophane([1, 2, 3]).each(function(val, i, array) {
      args.push(clone([val, i, array]));
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]],
      [3, 2, [1, 2, 3]]
    ]);
    t.end();
  });

  t.test('breaks from the loop if `fn` returns `false`', function(t) {
    var args = [];
    cellophane([1, 2, 3]).each(function(val, i, array) {
      args.push(clone([val, i, array]));
      if (val === 2) {
        return false;
      }
    });
    t.looseEqual(args, [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]]
    ]);
    t.end();
  });

});
