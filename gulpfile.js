'use strict'

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');
const concat = require('gulp-concat')

gulp.task('min-ghostjs', function() {
  return gulp.src('./core/built/assets/ghost.js')
    .pipe(uglify())
    .pipe(concat('ghost.min.js'))
    .pipe(gulp.dest('./core/built/assets/'))
});

gulp.task('min-vendorjs', function() {
  return gulp.src('./core/built/assets/vendor.js')
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./core/built/assets/'))
});

gulp.task('copyjs', function() {
  return gulp.src('./front/js/*.js')
    .pipe(gulp.dest('./core/built/assets'))
});

gulp.task('default', ['copyjs']);

gulp.task('pro', ['copyjs', 'min-ghostjs', 'min-vendorjs']);
