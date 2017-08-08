'use strict';

//////////////////////////////
// Requires
//////////////////////////////

const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const nodemon = require('gulp-nodemon');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

//////////////////////////////
// Browser Sync Task
//////////////////////////////
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    //proxy: "localhost:8080",  // local node app address
    port: 8082,  // use *different* port than above
    notify: true
  });
});

//////////////////////////////
// Sass Tasks
//////////////////////////////
gulp.task('sass', function () {
  gulp.src('public/scss/**/*.scss')
      .pipe(autoprefixer())
      .pipe(sass())
      .pipe(gulp.dest('public/css'))
      .pipe(browserSync.stream());
});

//////////////////////////////
// Nodemon Task
//////////////////////////////
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'index.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['views/**/*.html'], reload);
  gulp.watch(['public/scss/**/*.scss'], ['sass']);
});