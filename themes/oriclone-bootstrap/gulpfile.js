'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassOptions = {
    includePaths: ['sass'],
    outputStyle: 'compressed'
  };

sass.compiler = require('node-sass');

//compile
gulp.task('sass', function () {
  return gulp.src('sass/themes/oriclone/*.scss')
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(gulp.dest('static/assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('sass/themes/oriclone/*.scss', gulp.series('sass'));
});
