'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const surge = require('gulp-surge');

/* Compile sass files */
gulp.task('sass', function(){
  return gulp.src('./app/src/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Compile pug files
gulp.task('pug', function(){
  return gulp.src('app/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
})

// Javascript
gulp.task('js', function(){

  gulp.src("./app/src/js/functions.js")
    .pipe(rename("./js/functions.js"))
    .pipe(gulp.dest("dist"));

})


// Browser Sync
gulp.task('browser-sync',['sass', 'pug','js'], function(){
  browserSync.init({
    server: "./dist"
  });
});


// Watch files
gulp.task('watch', function(){
  gulp.watch('app/src/sass/*.sass', ['sass']);
  gulp.watch('app/*.pug', ['pug']);
  gulp.watch('./dist/*.html').on('change', reload);
  gulp.watch('./app/src/js/*.js', ['js']);
  gulp.watch('./dist/js/*.js').on('change', reload);
});


 // Run default task
gulp.task('default', ['watch', 'browser-sync']);