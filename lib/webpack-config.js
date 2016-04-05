var _ = require('lodash'),
    webpack = require('webpack');

function webpackConfig(config, options) {
    config = _.extend({
        entry: [],
        output: {},
        plugins: []
    }, config);
    config.module = _.extend({ loaders: [] }, config.module);

    if (options.hot == true) {
        config.entry = ['webpack-hot-middleware/client'].concat(config.entry);
        config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(config.plugins);
        config.module.loaders = [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'jsx?harmony'],
            include: options.src
        }].concat(config.module.loaders);
    } else {
        config.module.loaders = [{
            test: /\.jsx?$/,
            loaders: ['jsx?harmony'],
            include: options.src
        }].concat(config.module.loaders);
    }

    return config;
}

module.exports = webpackConfig;
