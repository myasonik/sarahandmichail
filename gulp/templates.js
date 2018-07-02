var $ = require('./common.js');
var config = require('./config.js');

var jade = require('gulp-jade');
var jadeInheritance = require('gulp-jade-inheritance');
var filter = require('gulp-filter');
var en = require('../source/views/en.json');
var ru = require('../source/views/ru.json');

var jadeSrc = './' + config.src + 'views/';

$.gulp.task('views', ['russian'], function() {
    return $.gulp.src(jadeSrc + '**/*.jade')
        .pipe($.plumber({ errorHandler: $.notify.onError('<%= error.message %>') }))
        .pipe(jadeInheritance({ basedir: jadeSrc }))
        .pipe(jade({
            basedir: jadeSrc,
            pretty: true,
            locals: {
                text: en,
                production: config.prod
            },
        }))
        .pipe(filter(function(file) {
            var exclude;
            if (config.outputJadeIncludes) exclude = new RegExp('templates|mixins', 'g');
            else exclude = new RegExp('templates|mixins|includes', 'g');

            return !exclude.test(file.path);
        }))
        .pipe($.gulp.dest(config.dest));
});

$.gulp.task('russian', function() {
    return $.gulp.src(jadeSrc + '**/*.jade')
        .pipe($.plumber({ errorHandler: $.notify.onError('<%= error.message %>') }))
        .pipe(jadeInheritance({ basedir: jadeSrc }))
        .pipe(jade({
            basedir: jadeSrc,
            pretty: true,
            locals: {
                text: ru,
                production: config.prod
            },
        }))
        .pipe(filter(function(file) {
            var exclude;
            if (config.outputJadeIncludes) exclude = new RegExp('templates|mixins', 'g');
            else exclude = new RegExp('templates|mixins|includes', 'g');

            return !exclude.test(file.path);
        }))
        .pipe($.gulp.dest(config.dest + '/ru/'));
});