'use strict';

var cellophane = require('../');

var original = cellophane([{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
console.log(original.array); //=> [{ foo: 1 }, { foo: 2 }, { foo: 3 }]

var filtered = original.filter('foo', '>', 1);
console.log(filtered === original); //=> false
console.log(filtered.array === original.array); //=> false
console.log(filtered.array[0] === original.array[1]); //=> true
console.log(filtered.array[1] === original.array[2]); //=> true
