'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var googleWebFonts = require('gulp-google-webfonts');
var rewriteCSS = require('gulp-rewrite-css');


gulp.task('css', function () {
  return gulp
    .src('site.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(rename('app.min.css'))
      .pipe(rewriteCSS({
          destination: './dist/css/'
      }))
      .pipe(minifyCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/css'))
});

gulp.task('js', function(){
  return gulp.src(['node_modules/uikit/dist/js/uikit.js', 'node_modules/uikit/dist/js/uikit-icons.js', 'site.js'])
      .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/js'))
});

gulp.task('fonts', function () {
  return gulp.src('./fonts.list')
      .pipe(googleWebFonts({
        fontsDir: 'dist/fonts',
        cssFilename: '_fonts.scss'
      }))
      .pipe(gulp.dest('./'))
});

gulp.task('default', gulp.series('fonts', 'css', 'js'));
