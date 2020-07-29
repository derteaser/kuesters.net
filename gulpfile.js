const gulp = require('gulp');
const postcss = require('gulp-postcss');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const env = require('gulp-env');


gulp.task('dev-css', function () {
    return gulp
        .src('./css/kuesters-tailwind.css')
        .pipe(postcss([
            require('postcss-import'),
            require('tailwindcss'),
            require('postcss-nested'),
            require('autoprefixer'),
        ]))
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('prod-css', function () {
    env.set({
        NODE_ENV: 'production'
    });
    return gulp
        .src('./css/kuesters-tailwind.css')
        .pipe(postcss([
            require('postcss-import'),
            require('tailwindcss'),
            require('postcss-nested'),
            require('autoprefixer'),
        ]))
        .pipe(rename('app.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist'))
});

gulp.task('copy-js-tools', function () {
    return gulp.src([
        'node_modules/alpinejs/dist/alpine.js',
        'node_modules/alpinejs/dist/alpine-ie11.js',
    ])
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-icons', function () {
    return gulp.src([
        'node_modules/@fortawesome/fontawesome-free/sprites/brands.svg',
        'node_modules/@fortawesome/fontawesome-free/sprites/regular.svg',
        'node_modules/@fortawesome/fontawesome-free/sprites/solid.svg',
    ])
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('default', gulp.series('dev-css', 'copy-js-tools', 'copy-icons', 'prod-css'));