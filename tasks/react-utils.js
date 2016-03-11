'use strict';

var _ = require('lodash');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerMultiTask('react-utils', 'Use next generation JavaScript, today', function () {
        var tname = this.nameArgs.replace(/:/g, '-');

        grunt.config.set('babel.' + tname, _.extend({
            options: {
                presets: ['react', 'es2015'],
                plugins: ['transform-es2015-modules-umd']
            }
        }, this.data));

        grunt.task.run('babel:' + tname);
    });
};
