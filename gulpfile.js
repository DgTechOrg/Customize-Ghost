'use strict'

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');

gulp.task('min-ghostjs', function() {
  return gulp.src('./core/built/assets/ghost.js')
    .pipe(uglify())
    .pipe(gulp.dest('./core/built/assets/ghostmin.js'))
});

gulp.task('min-vendorjs', function() {
  return gulp.src('./core/built/assets/vendor.js')
    .pipe(uglify())
    .pipe(gulp.dest('./core/built/assets/vendormin.js'))
});

gulp.task('copyjs', function() {
  return gulp.src('./front/js/*.js')
    .pipe(gulp.dest('./core/built/assets'))
});

gulp.task('default', ['copyjs']);
gulp.task('pro', ['min-ghostjs', 'min-vendorjs']);
