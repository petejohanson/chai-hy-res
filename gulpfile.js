'use strict';

var gulp = require('gulp'),
  lazypipe = require('lazypipe'),
  karma = require('gulp-karma'),
  jshint = require('gulp-jshint');

function getJSHintPipe(rc) {
  return lazypipe()
    .pipe(jshint, rc || '.jshintrc')
    .pipe(jshint.reporter, 'jshint-stylish')
    .pipe(jshint.reporter, 'fail');
}

gulp.task('jshint', ['jshint:src', 'jshint:gulpfile']);

gulp.task('jshint:src', function() {
  return gulp.src('index.js')
    .pipe(getJSHintPipe()());
});

gulp.task('jshint:gulpfile', function() {
  return gulp.src('gulpfile.js')
    .pipe(getJSHintPipe()());
});

function karmaPipe(action) {
  return gulp.src('test/**/*.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: action
    })).on('error', function(err) {
      throw err;
    });
}

gulp.task('karma:watch', function() {
  return karmaPipe('watch');
});

gulp.task('karma', function() {
  return karmaPipe('run');
});

gulp.task('default', ['jshint', 'karma']);
