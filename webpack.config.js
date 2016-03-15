'use strict';

module.exports = {
    context: __dirname + '/lib',
    entry: './browser-index.js',
    output: {
        libraryTarget: 'umd',
        path: __dirname + '/dist',
        filename: 'index.js'
    },
    externals: [/^[a-z]/]
}
