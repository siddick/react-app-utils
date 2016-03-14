'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    requestData = require('./request-data'),
    RR = require('react-router');

function initClient(options) {
    var content = options.element || document.getElementById(options.elementId || 'react-content');

    RR.browserHistory.setState(options.state || JSON.parse(content.getAttribute('data-react-state')));

    ReactDOM.render(React.createElement(RR.Router, {
        history: RR.browserHistory
    }, requestData(options.routes)), content);
}

module.exports = initClient;
