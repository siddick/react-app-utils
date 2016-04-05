'use strict';
var webpackConfig = require('./webpack-config');

module.exports = function (grunt, config, options) {
    grunt.loadNpmTasks('grunt-webpack');

    return webpackConfig(config, options);
};
