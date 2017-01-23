'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var surge = require('gulp-surge');

gulp.task('sass', function(){
  return gulp.src('./app/src/sass/main.sass')
  .pipe(sass({ includePaths : ['_/sass/'] }))
  .pipe(gulp.dest('./app/src/css'))
});