'use strict';

var gulp = require('gulp'),
  lazypipe = require('lazypipe'),
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

gulp.task('default', ['jshint']);
