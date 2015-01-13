'use strict';

var deepEqual = require('deep-equal');
var get = require('jaunt').get;
var versus = require('versus');

var Cellophane = function(array) {
  if (!Array.isArray(array)) {
    throw new Error('need an array');
  }
  if (!(this instanceof Cellophane)) {
    return new Cellophane(array);
  }
  this.array = array;
};

Cellophane.prototype.any = function(a, b, c) {
  var result = false;
  switch (arguments.length) {
  case 1:
    // any(fn)
    this.each(function(val, i, array) {
      if (a(array[i], i, array)) {
        result = true;
        return false;
      }
    });
    break;
  case 2:
    // any(op, val)
    this.each(function(val, i, array) {
      if (versus(array[i], a, b)) {
        result = true;
        return false;
      }
    });
    break;
  case 3:
    // any(key, op, val)
    this.each(function(val, i, array) {
      if (versus(get(array[i], a), b, c)) {
        result = true;
        return false;
      }
    });
    break;
  }
  return result;
};

Cellophane.prototype.compact = function() {
  return this.filter(function(val) {
    return val;
  });
};

Cellophane.prototype.contains = function(obj, opts) {
  return this.indexOf(obj, opts) !== -1;
};

Cellophane.prototype.each = Cellophane.prototype.forEach = function(fn) {
  var array = this.array;
  var i = -1;
  var len = array.length;
  while (++i < len) {
    if (fn(array[i], i, array) === false) {
      return this;
    }
  }
  return this;
};

Cellophane.prototype.every = function(a, b, c) {
  var result = true;
  switch (arguments.length) {
  case 1:
    // every(fn)
    this.each(function(val, i, array) {
      if (!a(array[i], i, array)) {
        result = false;
        return false;
      }
    });
    break;
  case 2:
    // every(op, val)
    this.each(function(val, i, array) {
      if (!versus(array[i], a, b)) {
        result = false;
        return false;
      }
    });
    break;
  case 3:
    // every(key, op, val)
    this.each(function(val, i, array) {
      if (!versus(get(array[i], a), b, c)) {
        result = false;
        return false;
      }
    });
    break;
  }
  return result;
};

Cellophane.prototype.filter = function(a, b, c) {
  var result = [];
  switch (arguments.length) {
  case 1:
    // filter(fn)
    this.each(function(val, i, array) {
      if (a(array[i], i, array)) {
        result.push(array[i]);
      }
    });
    break;
  case 2:
    // filter(op, val)
    this.each(function(val, i, array) {
      if (versus(array[i], a, b)) {
        result.push(array[i]);
      }
    });
    break;
  case 3:
    // filter(key, op, val)
    this.each(function(val, i, array) {
      if (versus(get(array[i], a), b, c)) {
        result.push(array[i]);
      }
    });
    break;
  }
  return new Cellophane(result);
};

Cellophane.prototype.first = function(n) {
  if (n == null) {
    return this.array[0];
  }
  return new Cellophane(this.array.slice(0, n));
};

Cellophane.prototype.last = function(n) {
  var len = this.array.length;
  if (n == null) {
    return this.array[len-1];
  }
  return new Cellophane(this.array.slice(len - n));
};

Cellophane.prototype.fold = Cellophane.prototype.reduce = function(fn, acc) {
  this.each(function(val, i, array) {
    acc = fn(acc, array[i], i, array);
  });
  return Array.isArray(acc) ? new Cellophane(acc) : acc;
};

Cellophane.prototype.get = function(i) {
  var array = this.array;
  if (i < 0) {
    return array[array.length + i];
  }
  return array[i];
};

Cellophane.prototype.indexOf = function(obj, opts) {
  var result = -1;
  if (opts && opts.strict === false) {
    this.each(function(val, i) {
      if (deepEqual(val, obj)) {
        result = i;
        return false;
      }
    });
  } else {
    this.each(function(val, i) {
      if (val === obj) {
        result = i;
        return false;
      }
    });
  }
  return result;
};

Cellophane.prototype.limit = function(n) {
  return new Cellophane(n < 0 ? this.array.slice(n) : this.array.slice(0, n));
};

Cellophane.prototype.map = function(fn) {
  var result = [];
  this.each(function(val, i, array) {
    result.push(fn(array[i], i, array));
  });
  return new Cellophane(result);
};

Cellophane.prototype.max = Cellophane.prototype.maximum = function(key) {
  var array = this.array;
  var i = 0;
  var len = array.length;
  var max = array[0];
  var curr;
  if (key) {
    // max(key)
    var maxVal = get(this.array[0], key);
    while (++i < len) {
      curr = array[i];
      var currVal = get(curr, key);
      if (currVal > maxVal) {
        maxVal = currVal;
        max = curr;
      }
    }
  } else {
    // max()
    while (++i < len) {
      curr = array[i];
      if (curr > max) {
        max = curr;
      }
    }
  }
  return max;
};

Cellophane.prototype.min = Cellophane.prototype.minimum = function(key) {
  var array = this.array;
  var i = 0;
  var len = array.length;
  var min = array[0];
  var curr;
  if (key) {
    // min(key)
    var minVal = get(this.array[0], key);
    while (++i < len) {
      curr = array[i];
      var currVal = get(curr, key);
      if (currVal < minVal) {
        minVal = currVal;
        min = curr;
      }
    }
  } else {
    // min()
    while (++i < len) {
      curr = array[i];
      if (curr < min) {
        min = curr;
      }
    }
  }
  return min;
};

Cellophane.prototype.reverse = function() {
  var array = this.array;
  var i = array.length;
  var result = [];
  while (i--) {
    result.push(array[i]);
  }
  return new Cellophane(result);
};

Cellophane.prototype.size = Cellophane.prototype.length = function() {
  return this.array.length;
};

Cellophane.prototype.slice = Cellophane.prototype.subarray = function(i, j) {
  return new Cellophane(this.array.slice(i, j));
};

Cellophane.prototype.sort = function(a, b) {
  var result = this.array.slice(0);
  if (typeof a === 'function') {
    // sort(fn)
    result.sort(a);
  } else {
    // sort(key, order)
    result.sort(function(x, y) {
      x = get(x, a);
      y = get(y, a);
      if (b === 'desc') {
        var temp = x;
        x = y;
        y = temp;
      }
      if (typeof x === 'string' && typeof y === 'string') {
        return x.localeCompare(y);
      }
      return x > y ? 1 : -1;
    });
  }
  return new Cellophane(result);
};

Cellophane.prototype.unique = function() {
  var result = [];
  this.each(function(val) {
    if (result.indexOf(val) === -1) {
      result.push(val);
    }
  });
  return new Cellophane(result);
};

Cellophane.prototype.unwrap = function() {
  return this.array.slice(0);
};

module.exports = Cellophane;
