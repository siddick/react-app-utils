'use strict';

var jQuery = require('jquery'),
    React = require('react'),
    RR = require('react-router');

function triggerEvent(event, time) {
    if (time) {
        setTimeout(function () {
            jQuery(document).trigger(event);
        }, time)
    } else {
        jQuery(document).trigger(event);
    }
}

function requestData(prevState, nextState, replace, callback) {
    var location = nextState.location;

    triggerEvent('page:fetch');
    if (!location.state && location.action === 'PUSH') {
        jQuery.getJSON(location.pathname + location.search, function (json) {
            location.state = json;
            replace(location);
            callback();
            triggerEvent('page:change', 1);
        });
    } else {
        callback();
        triggerEvent('page:change', 1);
    }
}

module.exports = function (routes) {
    return React.createElement(RR.Route, { onChange: requestData }, routes);
};
