'use strict';

var jQuery = require('jquery'),
    React = require('react'),
    RR = require('react-router');

function requestData(location, callback) {
    if (!location.state && location.action === 'PUSH') {
        jQuery.getJSON(location.pathname + location.search, function (json) {
            location.state = json;
            RR.browserHistory.replace(location);
        });
    } else {
        callback();
    }
}

module.exports = function (routes) {
    return React.createElement(RR.Route, { getComponent: requestData }, routes);
};
