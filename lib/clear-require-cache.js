'use strict';

var _ = require('lodash'),
	noCache = /\/node_modules\//;

function clearRequireCache(next) {
	var keys = _.keys(require.cache);
	next(function () {
		_.each(_.keys(require.cache, keys), function (key) {
			if (!noCache.test(key)) {
				delete require.cache[key];
			}
		});
	});
}

module.exports = clearRequireCache;
