# Cellophane.js [![npm Version](http://img.shields.io/npm/v/cellophane.svg?style=flat)](https://www.npmjs.org/package/cellophane) [![Build Status](https://img.shields.io/travis/yuanqing/cellophane.svg?style=flat)](https://travis-ci.org/yuanqing/cellophane) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/cellophane.svg?style=flat)](https://coveralls.io/r/yuanqing/cellophane)

> A lightweight wrapper around the array.

## Usage notes

### Accessing the &ldquo;internal&rdquo; array

Get the Cellophane object&rsquo;s &ldquo;internal&rdquo; array on its `.array` attribute:

```js
var original = cellophane([{ foo: 1 }, { foo: 2 }, { foo: 3 }]);

console.log(original.array); //=> [{ foo: 1 }, { foo: 2 }, { foo: 3 }]
```

### All methods return a *copy*

Each Cellophane object is designed to be *immutable*. So, for all methods (other than [`each`](#eachfn)) that returns a Cellophane object, it is actually a *copy* of the original Cellophane object that is returned:

```js
var filtered = original.filter('foo', '>', 1);

console.log(filtered === original); //=> false
```

By *copy*, we mean that while `filtered.array` and `original.array` are different arrays, and refer to *different* objects in memory&hellip;

```js
console.log(filtered.array === original.array); //=> false
```

&hellip;they actually *contain* references to the *same* objects:

```js
console.log(filtered.array[0] === original.array[1]); //=> true
console.log(filtered.array[1] === original.array[2]); //=> true
```

### Iterator function signature

For all methods that take an iterator `fn` (called over each object in the array), note that the iterator is passed 3 arguments:

- `val` &mdash; The current object of the array being iterated over.
- `i` &mdash; The index of the current object.
- `array` &mdash; The Cellophane object&rsquo;s internal array.

The exceptions are the [`fold`](#foldfn-acc) and [`foldr`](#foldrfn-acc) methods; their `fn` iterator takes an additional `acc` accumulator argument.

### Operators for comparing values

In the [`any`](#anyop-val), [`every`](#everyop-val), and [`filter`](#filterop-val) methods, the `op` argument must be one of the following strings:

- `'=='`
- `'==='`
- `'!='`
- `'!=='`
- `'<'`
- `'>'`
- `'<='`
- `'>='`

See [Versus.js](https://github.com/yuanqing/versus#usage).

### Accessing nested properties

In the [`any`](#anykey-op-val), [`every`](#everykey-op-val), [`filter`](#filterkey-op-val), and [`sortBy`](#sortbykey--opts) methods, access a nested object property by specifying a dot-delimited path as the `key`. For example:

```js
cellophane([
  { foo: { bar: 1 } },
  { foo: { bar: 2 } },
  { foo: { bar: 3 } }
]).any('foo.bar', '>', 0); //=> true
```

See [Jaunt.js](https://github.com/yuanqing/jaunt#jauntgetobj-path).

## API

- [`cellophane(array)`](#cellophanearray)
- [`.any(fn)`](#anyfn)
- [`.any(op, val)`](#anyop-val)
- [`.any(key, op, val)`](#anykey-op-val)
- [`.append(obj)`](#appendobj)
- [`.compact()`](#compact)
- [`.contains(obj [, opts])`](#containsobj--opts)
- [`.each(fn)`](#eachfn)
- [`.every(fn)`](#everyfn)
- [`.every(op, val)`](#everyop-val)
- [`.every(key, op, val)`](#everykey-op-val)
- [`.filter(fn)`](#filterfn)
- [`.filter(op, val)`](#filterop-val)
- [`.filter(key, op, val)`](#filterkey-op-val)
- [`.first([n])`](#firstn)
- [`.fold(fn, acc)`](#foldfn-acc)
- [`.foldr(fn, acc)`](#foldrfn-acc)
- [`.get(i)`](#geti)
- [`.indexOf(obj [, opts])`](#indexofobj--opts)
- [`.insert(obj, i)`](#insertobj-i)
- [`.last([n])`](#lastn)
- [`.limit(n)`](#limitn)
- [`.map(fn)`](#mapfn)
- [`.max([key])`](#maxkey)
- [`.min([key])`](#minkey)
- [`.prepend(obj)`](#prependobj)
- [`.remove(obj [, opts])`](#removeobj--opts)
- [`.removeAt(i)`](#removeati)
- [`.reverse()`](#reverse)
- [`.size()`](#size)
- [`.slice(i [, j])`](#slicei--j)
- [`.sort(fn)`](#sortfn)
- [`.sort([opts])`](#sortopts)
- [`.sortBy(key [, opts])`](#sortbykey--opts)
- [`.unique([opts])`](#uniqueopts)
- [`.unwrap()`](#unwrap)

### cellophane(array)

Constructs a new Cellophane object. Throws if `array` is not an array.

### .any(fn)

Returns `true` if the `fn` iterator is truthy for *any* object in the array.

```js
var c = cellophane([1, 2, 3]);

c.any(function(val, i, array) {
  return val > 1;
}); //=> true

c.any(function(val, i, array) {
  return val > 3;
}); //=> false
```

### .any(op, val)

Returns `true` if the [comparison with `val` using the `op` operator](#operators-for-comparing-values) returns `true` for *any* object in the array.

```js
var c = cellophane([1, 2, 3]);

c.any('>', 1); //=> true
c.any('>', 3); //=> false
```

### .any(key, op, val)

Returns `true` if the [comparison with `val` using the `op` operator](#operators-for-comparing-values) returns `true` for the value at `key` of *any* object in the array. `key` can be [a dot-delimited path](#accessing-nested-properties).

```js
var c = cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]);

c.any('foo', '>', 1); //=> true
c.any('foo', '>', 3); //=> false
```

### .append(obj)

Adds `obj` to the end of the array, returning the result as a new Cellophane object.

*Alias:* `add`, `push`

```js
cellophane([1, 2]).append(3); //=> cellophane([1, 2, 3])
```

### .compact()

Returns a new Cellophane object with falsy values removed.

```js
cellophane([1, null, 2, false, 3]).compact(); //=> cellophane([1, 2, 3])
```

### .contains(obj [, opts])

Returns `true` if the array contains `obj`, with objects [compared by value](https://github.com/substack/node-deep-equal). For strict comparison (ie. objects `a` and `b` are considered as equal if and only if `a === b`), set `opts.strict` to `true`.

```js
var c = cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]);

var obj = { foo: 2 };
c.contains(obj); //=> true
c.contains(obj, { strict: true }); //=> false
```

### .each(fn)

Calls the [`fn`](#iterator) iterator on each object in the array. Returns the original Cellophane object. Return `false` in `fn` to break from the loop.

*Alias:* `forEach`

```js
cellophane([1, 2, 3]).each(function(val, i, array) {
  console.log(val, i, array);
  //=> 1, 0, [1, 2, 3]
  //=> 2, 1, [1, 2, 3]
  if (val === 2) {
    return false;
  }
});
```

### .every(fn)

Returns `true` if the `fn` iterator is truthy for *every* object in the array.

```js
var c = cellophane([1, 2, 3]);

c.every(function(val, i, array) {
  return val > 0;
}); //=> true

c.every(function(val, i, array) {
  return val > 1;
}); //=> false
```

### .every(op, val)

Returns `true` if the [comparison with `val` using the `op` operator](#operators-for-comparing-values) returns `true` for *every* object in the array.

```js
var c = cellophane([1, 2, 3]);

c.every('>', 0); //=> true
c.every('>', 1); //=> false
```

### .every(key, op, val)

Returns `true` if the [comparison using the `op` operator with `val`](#operators-for-comparing-values) returns `true` for the value at `key` of *every* object in the array. `key` can be [a dot-delimited path](#accessing-nested-properties).

```js
var c = cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]);

c.every('foo', '>', 0); //=> true
c.every('foo', '>', 1); //=> false
```

### .filter(fn)

Filters the array using the `fn` iterator, returning the filtered result as a new Cellophane object.

```js
cellophane([1, 2, 3]).filter(function(val, i, array) {
  return val > 1;
}); //=> cellophane([2, 3])
```

### .filter(op, val)

Filters the array, including objects that return `true` when [compared with `val` using the `op` operator](#operators-for-comparing-values). Returns the filtered result as a new Cellophane object.

```js
cellophane([1, 2, 3]).filter('>', 1); //=> cellophane([2, 3])
```

### .filter(key, op, val)

Filters the array, including objects whose value at `key` returns `true` when [compared with `val` using the `op` operator](#operators-for-comparing-values). `key` can be [a dot-delimited path](#accessing-nested-properties). Returns the filtered result as a new Cellophane object.

```js
var c = cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]);

c.filter('foo', '>', 1);
//=> cellophane([
//     { foo: 2 },
//     { foo: 3 }
//   ])
```

### .first([n])

Returns the first object in the array. If `n` is specified, returns the first `n` objects of the array as a new Cellophane object.

```js
var c = cellophane([1, 2, 3]);

c.first(); //=> 1
c.first(2); //=> cellophane([1, 2])
```

### .fold(fn, acc)

Accumulates each object in the array to a single value, with the accumulator value initialised to `acc`. The `fn` iterator takes 4 arguments:
- `acc` &mdash; The current value of the accumulator.
- `val` &mdash; The current value of the array being iterated over.
- `i` &mdash; The current index.
- `array` &mdash; The Cellophane object&rsquo;s internal array.
Returns the final value of `acc`. If `acc` is an array, returns it wrapped in a new Cellophane object.

*Alias:* `foldl`, `reduce`

```js
var c = cellophane([1, 2, 3]);

c.fold(function(acc, val, i, array) {
  return acc + val;
}, 0); //=> 6

c.fold(function(acc, val, i, array) {
  acc.push(val * 10);
  return acc;
}, []); //=> cellophane([10, 20, 30])
```

### .foldr(fn, acc)

Just like [`fold`](#foldfn-acc), but the array is iterated over from right to left.

### .get(i)

Returns the object at index `i` of the array, or `undefined` if `i` is an invalid index. Use a negative `i` to start counting from the end of the array.

```js
var c = cellophane([1, 2, 3]);

c.get(0); //=> 1
c.get(1); //=> 2
c.get(2); //=> 3
c.get(3); //=> undefined

c.get(-1); //=> 3
c.get(-2); //=> 2
c.get(-3); //=> 1
```

### .indexOf(obj [, opts])

Returns the index of `obj` in the array, with objects [compared by value](https://github.com/substack/node-deep-equal). Returns `-1` if `obj` is not found in the array. For strict comparison (ie. objects `a` and `b` are considered as equal if and only if `a === b`), set `opts.strict` to `true`.

```js
var c = cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]);

var obj = { foo: 2 };
c.indexOf(obj); //=> 1
c.indexOf(obj, { strict: true }); //=> -1
```

### .insert(obj, i)

Inserts `obj` at index `i` of the array, returning the result as a new Cellophane object. If `i` is negative, indexing is from the *end* of the array (ie. index `-1` refers to the last object in the array, and so on). If `i` is beyond the bounds of the original array, the resulting array is &ldquo;expanded&rdquo; accordingly.

```js
var c = cellophane([1, 2, 3]);
var obj = 'foo';

c.insert(obj, 0); //=> cellophane([obj, 1, 2, 3])
c.insert(obj, 3); //=> cellophane([1, 2, 3, obj])
c.insert(obj, 4); //=> cellophane([1, 2, 3, undefined, obj])

c.insert(obj, -1); //=> cellophane([1, 2, 3, obj])
c.insert(obj, -4); //=> cellophane([obj, 1, 2, 3])
c.insert(obj, -5); //=> cellophane([obj, undefined, 1, 2, 3])
```

### .last([n])

Returns the last object in the array. If `n` is specified, returns the last `n` objects of the array as a new Cellophane object.

```js
var c = cellophane([1, 2, 3]);

c.last(); //=> 3
c.last(2); //=> cellophane([2, 3])
```

### .limit(n)

If `n` is positive, returns the first `n` objects of the array as a new Cellophane object. Else returns the last `|n|` objects of the array as a new Cellophane object.

```js
var c = cellophane([1, 2, 3]);

c.limit(2); //=> cellophane([1, 2])
c.limit(-2); //=> cellophane([2, 3])
```

### .map(fn)

Maps the array over the [`fn`](#iterator) iterator, returning the result as a new Cellophane object.

```js
var c = cellophane([1, 2, 3]);

c.map(function(val, i, array) {
  return val * 10;
}); //=> cellophane([10, 20, 30])
```

### .max([key])

Returns the largest object in the array. If `key` was specified, compares the objects based on the value corresponding to `key`. `key` can be [a dot-delimited path](#accessing-nested-properties).

*Alias:* `maximum`, `largest`

```js
cellophane([1, 2, 3]).max(); //=> 3

cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]).max('foo'); //=> { foo: 3 }
```

### .min([key])

Returns the smallest object in the array. If `key` was specified, compares the objects based on the value corresponding to `key`. `key` can be [a dot-delimited path](#accessing-nested-properties).

*Alias:* `minimum`, `smallest`

```js
cellophane([1, 2, 3]).min(); //=> 1

cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]).min('foo'); //=> { foo: 1 }
```

### .prepend(obj)

Adds `obj` to the start of the array, returning the result as a new Cellophane object.

```js
cellophane([2, 3]).prepend(1); //=> cellophane([1, 2, 3])
```

### .remove(obj [, opts])

Removes all objects that are equal to `obj` from the array, returning the result as a new Cellophane object. Objects are [compared by value](https://github.com/substack/node-deep-equal). For strict comparison (ie. objects `a` and `b` are considered as equal if and only if `a === b`), set `opts.strict` to `true`.

```js
cellophane([1, 2, 3, 1]).remove(1); //=> cellophane([2, 3])
```

### .removeAt(i)

Removes the object at index `i` of the array, returning the result as a new Cellophane object.

```js
cellophane([1, 2, 3]).removeAt(1); //=> cellophane([1, 3])
```

### .reverse()

Returns a new Cellophane object with the ordering of its objects reversed.

```js
cellophane([1, 2, 3]).reverse(); //=> cellophane([3, 2, 1])
```

### .size()

Returns the array size.

*Alias:* `length`

```js
cellophane([]).size(); //=> 0
cellophane([1, 2, 3]).size(); //=> 3
```

### .slice(i [, j])

Takes a [slice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) of the array and returns it as a new Cellophane object.

*Alias:* `subarray`

```js
cellophane([1, 2, 3]).slice(1, 2); //=> cellophane([2, 3])
```

### .sort(fn)

[Sorts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) the array using the `fn` comparator function, returning the sorted result as a new Cellophane object. `fn` takes two arguments `a` and `b`, and must return:
- a negative value if `a` is to be ordered *before* `b`, or
- a positive value if `a` is to be ordered *after* `b`, or
- `0` if the ordering of `a` and `b` (with respect to each other) should be left unchanged.

```js
cellophane([3, 1, 2]).sort(function(a, b) {
  return a < b ? -1 : 1;
}); //=> cellophane([1, 2, 3])
```

### .sort([opts])

Sorts the array in ascending order, returning the sorted result as a new Cellophane object. To sort in descending order, set `opts.order` to `'desc'`.

```js
cellophane([3, 1, 2]).sort(); //=> cellophane([1, 2, 3])
cellophane([3, 1, 2]).sort({ order: 'desc' }); //=> cellophane([3, 2, 1])
```

### .sortBy(key [, opts])

Sorts the array of objects in ascending order based on the value corresponding to `key` of each object, returning the sorted result as a new Cellophane object. `key` can be [a dot-delimited path](#accessing-nested-properties). To sort in descending order, set `opts.order` to `'desc'`.

```js
var c = cellophane([
  { foo: 3 },
  { foo: 1 },
  { foo: 2 },
]);

c.sort('foo');
//=> cellophane([
//     { foo: 1 },
//     { foo: 2 },
//     { foo: 3 }
//   ])

c.sort('foo', { order: 'desc' });
//=> cellophane([
//     { foo: 3 },
//     { foo: 2 },
//     { foo: 1 }
//   ])
```

### .unique([opts])

Returns a new Cellophane object with duplicates removed from the array. Objects are [compared by value](https://github.com/substack/node-deep-equal). For strict comparison (ie. objects `a` and `b` are considered as equal if and only if `a === b`), set `opts.strict` to `true`.

```js
var c = cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 2 },
  { foo: 1 },
  { foo: 3 }
]);

c.unique();
//=> cellophane([
//     { foo: 1 },
//     { foo: 2 },
//     { foo: 3 }
//   ])

c.unique({ strict: true });
//=> cellophane([
//     { foo: 1 },
//     { foo: 2 },
//     { foo: 2 },
//     { foo: 1 },
//     { foo: 3 }
//   ])
```

### .unwrap()

Returns a *copy* of the Cellophane object&rsquo;s &ldquo;internal&rdquo; array.

```js
cellophane([1, 2, 3]).unwrap(); //=> [1, 2, 3]
```

## Installation

Install via [npm](https://npmjs.com/):

```bash
$ npm i --save cellophane
```

## Changelog

- 0.1.0
  - Initial release

## License

[MIT license](https://github.com/yuanqing/cellophane/blob/master/LICENSE)
