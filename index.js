'use strict';

var deepEqual = require('deep-equal');
var get = require('jaunt').get;
var versus = require('versus');
var isArray = require('cheque').isArray;

var Cellophane = function(array) {
  if (!isArray(array)) {
    throw new Error('need an array');
  }
  if (!(this instanceof Cellophane)) {
    return new Cellophane(array);
  }
  this.array = array;
};

var indexOf = function(array, obj) {
  var i = array.length;
  while (i--) {
    if (deepEqual(array[i], obj, { strict: true })) {
      return i;
    }
  }
  return -1;
};

var indexOfStrict = function(array, obj) {
  var i = array.length;
  while (i--) {
    if (array[i] === obj) {
      return i;
    }
  }
  return -1;
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

Cellophane.prototype.each =
Cellophane.prototype.forEach = function(fn) {
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

Cellophane.prototype.fold =
Cellophane.prototype.foldl =
Cellophane.prototype.reduce = function(fn, acc) {
  this.each(function(val, i, array) {
    acc = fn(acc, array[i], i, array);
  });
  return isArray(acc) ? new Cellophane(acc) : acc;
};

Cellophane.prototype.foldr = function(fn, acc) {
  var array = this.array;
  var i = array.length;
  while (i--) {
    acc = fn(acc, array[i], i, array);
  }
  return isArray(acc) ? new Cellophane(acc) : acc;
};

Cellophane.prototype.get = function(i) {
  var array = this.array;
  if (i < 0) {
    return array[array.length + i];
  }
  return array[i];
};

Cellophane.prototype.indexOf = function(obj, opts) {
  return (opts && opts.strict === true ? indexOfStrict : indexOf)(this.array, obj);
};

Cellophane.prototype.last = function(n) {
  var len = this.array.length;
  if (n == null) {
    return this.array[len-1];
  }
  return new Cellophane(this.array.slice(len - n));
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

Cellophane.prototype.max =
Cellophane.prototype.maximum =
Cellophane.prototype.largest = function(key) {
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

Cellophane.prototype.min =
Cellophane.prototype.minimum =
Cellophane.prototype.smallest = function(key) {
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

Cellophane.prototype.size =
Cellophane.prototype.length = function() {
  return this.array.length;
};

Cellophane.prototype.slice =
Cellophane.prototype.subarray = function(i, j) {
  return new Cellophane(this.array.slice(i, j));
};

Cellophane.prototype.sort = (function() {
  var ascFn = function(a, b) {
    return a < b ? -1 : 1;
  };
  var descFn = function(a, b) {
    return a > b ? -1 : 1;
  };
  return function(a) {
    var result = this.array.slice();
    if (typeof a === 'function') {
      // sort(fn)
      result.sort(a);
    } else {
      // sort(opts)
      result.sort(a && a.order === 'desc' ? descFn : ascFn);
    }
    return new Cellophane(result);
  };
})();

Cellophane.prototype.sortBy = function(key, opts) {
  return new Cellophane(this.array.slice().sort(function(a, b) {
    a = get(a, key);
    b = get(b, key);
    if (opts && opts.order === 'desc') {
      var temp = a;
      a = b;
      b = temp;
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    return a < b ? -1 : 1;
  }));
};

Cellophane.prototype.unique = function(opts) {
  var result = [];
  var fn = opts && opts.strict ? indexOfStrict : indexOf;
  this.each(function(val) {
    if (fn(result, val) === -1) {
      result.push(val);
    }
  });
  return new Cellophane(result);
};

Cellophane.prototype.unwrap = function() {
  return this.array.slice();
};

module.exports = Cellophane;
