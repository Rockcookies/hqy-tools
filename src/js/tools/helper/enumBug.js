var HQY_types = require('../objects/types');
var HQY_has = require('../objects/has');

var arrayContains = require('./arrayContains');

// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
exports.hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');

var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
exports.collectNonEnumProps = function(obj, keys) {
	var nonEnumIdx = nonEnumerableProps.length;
	var constructor = obj.constructor;
	var proto = HQY_types.isFunction(constructor) && constructor.prototype || Object.prototype;

	// Constructor is a special case.
	var prop = 'constructor';
	if (HQY_has(obj, prop) && !arrayContains(keys, prop)) keys.push(prop);

	while (nonEnumIdx--) {
		prop = nonEnumerableProps[nonEnumIdx];
		if (prop in obj && obj[prop] !== proto[prop] && !arrayContains(keys, prop)) {
			keys.push(prop);
		}
	}
};
