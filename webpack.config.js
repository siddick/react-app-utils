'use strict';

module.exports = {
    context: __dirname + '/lib',
    entry: './browser-index.js',
    output: {
        libraryTarget: 'umd',
        path: __dirname + '/dist',
        filename: 'react-app-utils.js'
    },
    externals: [/^[a-z]/]
}
