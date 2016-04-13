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
        if (_.isString(config.entry) || _.isArray(config.entry)) {
            config.entry = ['webpack-hot-middleware/client'].concat(config.entry);
            config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(config.plugins);
        }
        config.module.loaders = [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel?presets[]=react&presets[]=es2015'],
            exclude: /(node_modules|bower_components)/,
            include: options.src,
        }].concat(config.module.loaders);
    } else {
        config.module.loaders = [{
            test: /\.jsx?$/,
            loader: 'babel?presets[]=react&presets[]=es2015',
            exclude: /(node_modules|bower_components)/,
            include: options.src
        }].concat(config.module.loaders);
    }

    return config;
}

module.exports = webpackConfig;
