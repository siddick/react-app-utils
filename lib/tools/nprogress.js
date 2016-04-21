'use strict';

var nprogress = require('nprogress'),
    $el;

nprogress.start();
$el = require('jquery')(document);

$el.on('page:fetch', function () {
    nprogress.start();
});

$el.on('page:change', function () {
    nprogress.done();
});

module.exports = nprogress;
