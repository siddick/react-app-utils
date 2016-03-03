'use strict';

var path = require('path'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    RR = require('react-router');

/*
 * var reactUtils = require('react-utils');
 *
 * app.use(new reactUtils.reactRender({
 *     layout: require('../public/views/layout'),
 *     routes: require('../public/views/routes')
 * }));
 */
function Render(options) {
    this.options = options;
}

Render.prototype = {
    toHtml: function (props, data) {
        var html = ReactDOMServer.renderToString(React.createElement(RR.RouterContext, props)),
            options = this.options;

        data = data || props.location.state;

        if (options.layout) {
            if (options.div != false) {
                html = (options.div || React.DOM.div)({
                    dangerouslySetInnerHTML: { __html: html },
                    id: 'react-content',
                    'data-react-state': JSON.stringify(data)
                });
            }
            html = React.createElement(options.layout, props, html);
            html = ReactDOMServer.renderToStaticMarkup(html);
        }
        return html;
    },
    render: function (req, res, data) {
        var options = this.options;

        RR.match({ routes: options.routes, location: req.url }, function (err, loc, props) {
            props.location.state = data;
            if (err) {
                res.status(500).send(err);
            } else if (loc) {
                res.redirect(302, loc.pathname + loc.search);
            } else if (props) {
                res.send(this.toHtml(props));
            } else {
                res.status(400).send('Not Found');
            }
        }.bind(this));
    },
    buildRender: function (req, res, next) {
        res.reactRender = this.render.bind(this, req, res);
        next();
    },
    middleware: function () {
        return this.buildRender.bind(this);
    }
};

module.exports = function (options) {
    return (new Render(options)).middleware();
};
