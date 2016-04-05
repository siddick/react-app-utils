var webpack = require('webpack'),
    webpackConfig = require('./webpack-config'),
    devMiddleware = require('webpack-dev-middleware'),
    hotMiddleware = require('webpack-hot-middleware'),
    _ = require('lodash');

module.exports = function (config, options) {
    var compiler = webpack(webpackConfig(config, _.pick(options, ['src', 'hot']))),
        dev = devMiddleware(compiler, _.pick(options, ['hot'])),
        hot = options.hot && hotMiddleware(compiler);

    function webpackMiddleware(req, res, next) {
        dev(req, res, (hot ? hot.bind(this, req, res, next) : next));
    }

    return webpackMiddleware;
};
