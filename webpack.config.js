module.exports = {
    context: __dirname + '/js',
    entry: './index.js',
    output: {
        libraryTarget: 'umd',
        path: __dirname + '/dist',
        filename: 'index.js'
    },
    externals: [/^[a-z]/]
}
