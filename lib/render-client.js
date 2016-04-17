'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    requestData = require('./request-data'),
    RR = require('react-router');

function initClient(options, callback) {
    var content = options.element || document.getElementById(options.elementId || 'react-content'),
        history = RR.browserHistory,
        loc = history.createLocation(location);

    loc.state = options.state || JSON.parse(content.getAttribute('data-react-state'));
    history.replace(loc);

    ReactDOM.render(React.createElement(RR.Router, {
        history: history
    }, requestData(options.routes)), content, callback);
}

module.exports = initClient;