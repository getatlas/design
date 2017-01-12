var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create('server');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var rename = require('gulp-rename');

gulp.task('styles', function() {
    return gulp.src('./resources/assets/sass/app.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

gulp.task('lint', function() {
    return gulp.src('./resources/assets/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('babel', function() {
    return gulp.src('./resources/assets/js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', ['styles', 'lint', 'babel'], function() {
    browserSync.init({
        server: {
            baseDir: './public',       
        },
    });

    gulp.watch('./resources/**/*.scss', ['styles']);
    gulp.watch('./public/*.html').on('change', browserSync.reload);
});
