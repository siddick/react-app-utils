'use strict';

var jQuery = require('jquery'),
    React = require('react'),
    RR = require('react-router'),
    DummyComponent;

DummyComponent = React.createClass({
    name: 'DummyComponent',
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
