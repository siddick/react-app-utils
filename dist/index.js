(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("jquery"), require("react-router"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "jquery", "react-router"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("react-dom"), require("jquery"), require("react-router")) : factory(root["react"], root["react-dom"], root["jquery"], root["react-router"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports.render = __webpack_require__(1);
	module.exports.setStateMixin = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2),
	    ReactDOM = __webpack_require__(3),
	    requestData = __webpack_require__(4),
	    RR = __webpack_require__(6);

	function initClient(options) {
	    var content = options.element || document.getElementById(options.elementId || 'react-content');

	    RR.browserHistory.setState(options.state || JSON.parse(content.getAttribute('data-react-state')));

	    ReactDOM.render(React.createElement(RR.Router, {
	        history: RR.browserHistory
	    }, requestData(options.routes)), content);
	}

	module.exports = initClient;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var jQuery = __webpack_require__(5),
	    React = __webpack_require__(2),
	    RR = __webpack_require__(6),
	    DummyComponent;

	DummyComponent = React.createClass({
	    displayName: 'DummyComponent',
	    render: function () {
	        return this.props.children;
	    }
	});

	function requestData(location, callback) {
	    if (!location.state && location.action === 'PUSH') {
	        jQuery.getJSON(location.pathname + location.search, function (json) {
	            RR.browserHistory.setState(json);
	        });
	    } else {
	        callback(null, DummyComponent);
	    }
	}

	module.exports = function (routes) {
	    return React.createElement(RR.Route, { getComponent: requestData }, routes);
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    getInitialState: function getInitialState() {
	        return this.props.location.state || {};
	    },
	    componentWillReceiveProps: function (props) {
	        this.setState(props.location.state || {} );
	    }
	};


/***/ }
/******/ ])
});
;