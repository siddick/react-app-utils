'use strict';

var React = require('react'),
    ReactDOM = require('react-dom/server'),
    RR = require('react-router'),
    path = require('path'),
    clearRequireCache = require('./clear-require-cache'),
    _ = require('lodash');

/*
 * var reactUtils = require('react-utils');
 *
 * app.use(new reactUtils.reactRender({
 *     layout: require('../public/views/layout'),
 *     routes: require('../public/views/routes')
 * }));
 */
function Render(options) {
    this.options = _.extend({}, options);
    if (this.options.src && this.options.src !== this.options.srcRegistered) {
        this.options.srcRegistered = this.options.src;
        require('babel-register')({
            presets: ['react'],
            only: this.options.src
        });
    }
}

Render.prototype = {
    layout: function () {
        var layout = this.options.layout,
            src = this.options.src || '';
        return _.isString(layout) ? require(path.join(src, layout)) : layout;
    },
    routes: function () {
        var routes = this.options.routes,
            src = this.options.src || '';
        return _.isString(routes) ? require(path.join(src, routes)) : routes;
    },
    toHtml: function (props, data) {
        var html = ReactDOM.renderToString(React.createElement(RR.RouterContext, props)),
            layout = this.layout(),
            options = this.options;

        data = data || props.location.state;

        if (layout) {
            if (options.div != false) {
                html = (options.div || React.DOM.div)({
                    dangerouslySetInnerHTML: { __html: html },
                    id: (options.elementId || 'react-content'),
                    'data-react-state': JSON.stringify(data)
                });
            }
            html = React.createElement(layout, props, html);
            html = ReactDOM.renderToStaticMarkup(html);
        }
        return html;
    },
    renderCacheHandler: function (req, res, data) {
        if (req.app.get("view cache") === true) {
            this.render(req, res, data);
        } else {
            clearRequireCache(function (done) {
                try {
                    this.render(req, res, data);
                } finally {
                    done();
                }
            }.bind(this));
        }
    },
    render: function (req, res, data) {
        if (req.xhr) {
            return res.send(data);
        }
        RR.match({ routes: this.routes(), location: req.url }, function (err, loc, props) {
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
        if (res.reactRender && !this.optionsInherited) {
            this.optionsInherited = true;
            this.options = _.extend({}, res.reactRender.reactObject.options, this.options);
        }
        res.reactRender = this.renderCacheHandler.bind(this, req, res);
        res.reactRender.reactObject = this;
        next();
    },
    middleware: function reactRender() {
        var t = this;
        return function (req, res, next) {
            t.buildRender(req, res, next);
        };
    }
};

module.exports = function (options) {
    var render = new Render(options);
    return render.middleware();
};
