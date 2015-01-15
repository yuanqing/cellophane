# Cellophane.js [![npm Version](http://img.shields.io/npm/v/cellophane.svg?style=flat)](https://www.npmjs.org/package/cellophane) [![Build Status](https://img.shields.io/travis/yuanqing/cellophane.svg?style=flat)](https://travis-ci.org/yuanqing/cellophane) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/cellophane.svg?style=flat)](https://coveralls.io/r/yuanqing/cellophane)

> A lightweight wrapper for arrays.

## API

### Constructor

- [`cellophane([array])`](#cellophanearray)

### Methods

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
- [`.foldRight(fn, acc)`](#foldrightfn-acc)
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
- [`.sort(comp)`](#sortcomp)
- [`.sort([opts])`](#sortopts)
- [`.sortBy(key [, opts])`](#sortbykey--opts)
- [`.unique([opts])`](#uniqueopts)
- [`.unwrap()`](#unwrap)

--

### cellophane([array])

Constructs a new Cellophane object. If `array` was specified, sets the Cellophane object&rsquo;s &ldquo;internal&rdquo; array to `array`. Throws if `array` is not an array.

```js
var a = cellophane();
var b = cellophane([]);
var c = cellophane([1, 2, 3]);
```

<sup>[&#8617;](#constructor)</sup>

### .any(fn)

Returns `true` if the [`fn` iterator](#iterator-function-signature) is truthy for any object in the array.

```js
var c = cellophane([1, 2, 3]);

c.any(function(val, i, array) {
  return val > 1;
}); //=> true

c.any(function(val, i, array) {
  return val > 3;
}); //=> false
```

<sup>[&#8617;](#methods)</sup>

### .any(op, val)

Returns `true` if the comparison with `val` using the [`op` operator](#operators-for-comparing-values) returns `true` for any object in the array.

```js
var c = cellophane([1, 2, 3]);

c.any('>', 1); //=> true
c.any('>', 3); //=> false
```

<sup>[&#8617;](#methods)</sup>

### .any(key, op, val)

Returns `true` if the comparison with `val` using the [`op` operator](#operators-for-comparing-values) returns `true` for the value at `key` of any object in the array. `key` can be a [dot-delimited path](#accessing-nested-properties).

```js
var c = cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]);

c.any('foo', '>', 1); //=> true
c.any('foo', '>', 3); //=> false
```

<sup>[&#8617;](#methods)</sup>

### .append(obj)

Adds `obj` to the end of the array, returning the result as a new Cellophane object.

*Aliases:* `add`, `push`

```js
cellophane([1, 2]).append(3); //=> cellophane([1, 2, 3])
```

<sup>[&#8617;](#methods)</sup>

### .compact()

Returns a new Cellophane object with falsy values removed.

```js
cellophane([0, 1, 2, 3]).compact(); //=> cellophane([1, 2, 3])
```

<sup>[&#8617;](#methods)</sup>

### .contains(obj [, opts])

Returns `true` if the array contains `obj`, with objects [compared by value](#compare-by-value). For strict comparison, set `opts.strict` to `true`.

```js
var c = cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]);

c.contains({ foo: 3 }); //=> true
c.contains({ foo: 3 }, { strict: true }); //=> false
```

<sup>[&#8617;](#methods)</sup>

### .each(fn)

Calls the [`fn` iterator](#iterator-function-signature) on each object in the array, and returns the original Cellophane object. Return `false` in the `fn` iterator to break from the loop.

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

<sup>[&#8617;](#methods)</sup>

### .every(fn)

Returns `true` if the [`fn` iterator](#iterator-function-signature) is truthy for every object in the array.

```js
var c = cellophane([1, 2, 3]);

c.every(function(val, i, array) {
  return val < 4;
}); //=> true

c.every(function(val, i, array) {
  return val < 3;
}); //=> false
```

<sup>[&#8617;](#methods)</sup>

### .every(op, val)

Returns `true` if the comparison with `val` using the [`op` operator](#operators-for-comparing-values) returns `true` for every object in the array.

```js
var c = cellophane([1, 2, 3]);

c.every('<', 4); //=> true
c.every('<', 3); //=> false
```

<sup>[&#8617;](#methods)</sup>

### .every(key, op, val)

Returns `true` if the comparison with `val` using the [`op` operator](#operators-for-comparing-values) returns `true` for the value at `key` of every object in the array. `key` can be a [dot-delimited path](#accessing-nested-properties).

```js
var c = cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]);

c.every('foo', '<', 4); //=> true
c.every('foo', '<', 3); //=> false
```

<sup>[&#8617;](#methods)</sup>

### .filter(fn)

Filters the array using the [`fn` iterator](#iterator-function-signature), returning the filtered result as a new Cellophane object.

```js
cellophane([0, 1, 2, 3]).filter(function(val, i, array) {
  return val > 0;
}); //=> cellophane([1, 2, 3])
```

<sup>[&#8617;](#methods)</sup>

### .filter(op, val)

Filters the array. Objects that return `true` when compared with `val` using the [`op` operator](#operators-for-comparing-values) will be included in the filtered result. Returns the filtered result as a new Cellophane object.

```js
cellophane([0, 1, 2, 3]).filter('>', 0); //=> cellophane([1, 2, 3])
```

<sup>[&#8617;](#methods)</sup>

### .filter(key, op, val)

Filters the array. Objects whose value at `key` returns `true` when compared with `val` using the [`op` operator](#operators-for-comparing-values) will be included in the filtered result. Returns the filtered result as a new Cellophane object. `key` can be a [dot-delimited path](#accessing-nested-properties).

```js
cellophane([
  { foo: 0 },
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]).filter('foo', '>', 0);
//=> cellophane([
//     { foo: 1 },
//     { foo: 2 },
//     { foo: 3 }
//   ])
```

<sup>[&#8617;](#methods)</sup>

### .first([n])

Returns the first object in the array. If `n` is specified, returns the first `n` objects of the array as a new Cellophane object.

```js
var c = cellophane([1, 2, 3]);

c.first(); //=> 1
c.first(2); //=> cellophane([1, 2])
```

<sup>[&#8617;](#methods)</sup>

### .fold(fn, acc)

Accumulates the objects in the array to a single value, with the accumulator value initialised to `acc`. Returns the final value of `acc`. If `acc` is an array, returns it wrapped in a new Cellophane object. The `fn` iterator takes 4 arguments:
- `acc` &mdash; The current value of the accumulator.
- `val` &mdash; The current value of the array being iterated over.
- `i` &mdash; The current index.
- `array` &mdash; The Cellophane object&rsquo;s internal array.

*Aliases:* `foldLeft`, `foldl`, `reduce`, `reduceLeft`

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

<sup>[&#8617;](#methods)</sup>

### .foldRight(fn, acc)

Just like [`fold`](#foldfn-acc), but the array is iterated over from right to left.

*Aliases:* `foldr`, `reduceRight`

<sup>[&#8617;](#methods)</sup>

### .get(i)

Returns the object at index `i` of the array, or `undefined` if `i` is an invalid index. If `i` is negative, indexing is from the *end* of the array (ie. index `-1` refers to the last object in the array, and so on).

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

<sup>[&#8617;](#methods)</sup>

### .indexOf(obj [, opts])

Returns the index of `obj` in the array, with objects [compared by value](#compare-by-value). For strict comparison, set `opts.strict` to `true`. Returns `-1` if `obj` is not found in the array.

```js
var c = cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]);

c.indexOf({ foo: 3 }); //=> 2
c.indexOf({ foo: 3 }, { strict: true }); //=> -1
```

<sup>[&#8617;](#methods)</sup>

### .insert(obj, i)

Inserts `obj` at index `i` of the array, returning the result as a new Cellophane object. If `i` is negative, indexing is from the *end* of the array (ie. index `-1` refers to the last object in the array, and so on). If `i` is beyond the bounds of the original array, the resulting array is &ldquo;expanded&rdquo; accordingly.

```js
var c = cellophane([1, 2, 3]);

c.insert('foo', 0); //=> cellophane(['foo', 1, 2, 3])
c.insert('foo', 3); //=> cellophane([1, 2, 3, 'foo'])
c.insert('foo', 4); //=> cellophane([1, 2, 3, undefined, 'foo'])

c.insert('foo', -1); //=> cellophane([1, 2, 3, 'foo'])
c.insert('foo', -4); //=> cellophane(['foo', 1, 2, 3])
c.insert('foo', -5); //=> cellophane(['foo', undefined, 1, 2, 3])
```

<sup>[&#8617;](#methods)</sup>

### .last([n])

Returns the last object in the array. If `n` is specified, returns the last `n` objects of the array as a new Cellophane object.

```js
var c = cellophane([1, 2, 3]);

c.last(); //=> 3
c.last(2); //=> cellophane([2, 3])
```

<sup>[&#8617;](#methods)</sup>

### .limit(n)

If `n` is positive, returns the first `n` objects of the array as a new Cellophane object. Else returns the last `|n|` objects of the array as a new Cellophane object.

```js
var c = cellophane([1, 2, 3]);

c.limit(2); //=> cellophane([1, 2])
c.limit(-2); //=> cellophane([2, 3])
```

<sup>[&#8617;](#methods)</sup>

### .map(fn)

Maps the array over the [`fn` iterator](#iterator-function-signature), returning the result as a new Cellophane object.

```js
cellophane([1, 2, 3]).map(function(val, i, array) {
  return val * 10;
}); //=> cellophane([10, 20, 30])
```

<sup>[&#8617;](#methods)</sup>

### .max([key])

Returns the largest object in the array. If `key` was specified, compares the objects based on the value corresponding to `key`. `key` can be a [dot-delimited path](#accessing-nested-properties).

*Aliases:* `maximum`, `largest`

```js
cellophane([1, 2, 3]).max(); //=> 3

cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]).max('foo'); //=> { foo: 3 }
```

<sup>[&#8617;](#methods)</sup>

### .min([key])

Returns the smallest object in the array. If `key` was specified, compares the objects based on the value corresponding to `key`. `key` can be a [dot-delimited path](#accessing-nested-properties).

*Aliases:* `minimum`, `smallest`

```js
cellophane([1, 2, 3]).min(); //=> 1

cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]).min('foo'); //=> { foo: 1 }
```

<sup>[&#8617;](#methods)</sup>

### .prepend(obj)

Adds `obj` to the start of the array, returning the result as a new Cellophane object.

```js
cellophane([2, 3]).prepend(1); //=> cellophane([1, 2, 3])
```

<sup>[&#8617;](#methods)</sup>

### .remove(obj [, opts])

Removes all objects that are equal to `obj` from the array, with objects [compared by value](https://github.com/substack/node-deep-equal). For strict comparison, set `opts.strict` to `true`. Returns the result as a new Cellophane object.

```js
cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 },
  { foo: 1 }
]).remove({ foo: 1 });
//=> cellophane([
//     { foo: 2 },
//     { foo: 3 }
//   ])

cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 },
  { foo: 1 }
]).remove({ foo: 1 }, { strict: true });
//=> cellophane([
//     { foo: 1 },
//     { foo: 2 },
//     { foo: 3 },
//     { foo: 1 }
//   ])
```

<sup>[&#8617;](#methods)</sup>

### .removeAt(i)

Removes the object at index `i` of the array, returning the result as a new Cellophane object.

```js
cellophane([1, 2, 3]).removeAt(1); //=> cellophane([1, 3])
```

<sup>[&#8617;](#methods)</sup>

### .reverse()

Returns a new Cellophane object with the ordering of its objects reversed.

```js
cellophane([1, 2, 3]).reverse(); //=> cellophane([3, 2, 1])
```

<sup>[&#8617;](#methods)</sup>

### .size()

Returns the array size.

*Alias:* `length`

```js
cellophane([]).size(); //=> 0
cellophane([1, 2, 3]).size(); //=> 3
```

<sup>[&#8617;](#methods)</sup>

### .slice(i [, j])

Takes a [slice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) of the array and returns it as a new Cellophane object.

*Alias:* `subarray`

```js
cellophane([1, 2, 3]).slice(1, 2); //=> cellophane([2, 3])
```

<sup>[&#8617;](#methods)</sup>

### .sort(comp)

[Sorts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) the array using the `comp` comparator function, returning the sorted result as a new Cellophane object. `comp` takes two arguments `a` and `b`, and must return:
- a negative value if `a` is to be ordered before `b`, or
- a positive value if `a` is to be ordered after `b`, or
- `0` if the ordering of `a` and `b` (with respect to each other) should be left unchanged.

```js
cellophane([3, 1, 2]).sort(function(a, b) {
  return a < b ? -1 : 1;
}); //=> cellophane([1, 2, 3])
```

<sup>[&#8617;](#methods)</sup>

### .sort([opts])

Sorts the array in ascending order, returning the sorted result as a new Cellophane object. Set `opts.order` to `'desc'` to sort in descending order.

```js
cellophane([3, 1, 2]).sort(); //=> cellophane([1, 2, 3])
cellophane([3, 1, 2]).sort({ order: 'desc' }); //=> cellophane([3, 2, 1])
```

<sup>[&#8617;](#methods)</sup>

### .sortBy(key [, opts])

Sorts the array of objects in ascending order based on the value corresponding to `key` of each object, returning the sorted result as a new Cellophane object. `key` can be a [dot-delimited path](#accessing-nested-properties). To sort in descending order, set `opts.order` to `'desc'`.

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

<sup>[&#8617;](#methods)</sup>

### .unique([opts])

Removes duplicates removed from the array, with objects [compared by value](https://github.com/substack/node-deep-equal). For strict comparison, set `opts.strict` to `true`. Returns the result as a new Cellophane object.

```js
var c = cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 },
  { foo: 1 }
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
//     { foo: 3 },
//     { foo: 1 }
//   ])
```

<sup>[&#8617;](#methods)</sup>

### .unwrap()

Returns a *copy* of the Cellophane object&rsquo;s &ldquo;internal&rdquo; array.

```js
cellophane([1, 2, 3]).unwrap(); //=> [1, 2, 3]
```

<sup>[&#8617;](#methods)</sup>

## Usage notes

### Accessing the &ldquo;internal&rdquo; array

We can get the Cellophane object&rsquo;s &ldquo;internal&rdquo; array on its `.array` attribute:

```js
var original = cellophane([{ foo: 1 }, { foo: 2 }, { foo: 3 }]);

console.log(original.array); //=> [{ foo: 1 }, { foo: 2 }, { foo: 3 }]
```

### Methods always return a *copy*

A Cellophane object is designed to be *immutable*. So, for all methods (apart from [`each`](#eachfn)) that returns a Cellophane object, it is actually a *copy* of the original Cellophane object that is returned:

```js
var filtered = original.filter('foo', '>', 1);

console.log(filtered === original); //=> false
```

By *copy*, we mean that while `filtered.array` and `original.array` are different arrays, and refer to *different* objects in memory&hellip;

```js
console.log(filtered.array === original.array); //=> false
```

&hellip;they actually contain references to the *same* objects:

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

### Compare by value

In the [`contains`](#containsobj--opts), [`indexOf`](#indexofobj--opts), and [`remove`](#removeobj--opts) methods, the default behavior is to compare objects by value. For example:

```js
cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]).contains({ foo: 3 }); //=> true
```

See [deep-equal](https://github.com/substack/node-deep-equal).

To use strict comparison (where objects `a` and `b` are considered as equal if and only if `a === b`), set `opts.strict` to `true`.

```js
var opts = { strict: true };

cellophane([
  { foo: 1 },
  { foo: 2 },
  { foo: 3 }
]).contains({ foo: 3 }, opts); //=> false
```

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
