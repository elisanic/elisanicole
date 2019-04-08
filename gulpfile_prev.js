const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const runsequence = require('run-sequence');
const notify = require('gulp-notify');
const del = require('del');

const plumberErrorHandler = {
  errorHandler: notify.onError({
    title:'<%= error.plugin %>',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('clean', function () {
  return del.sync('docs');
});

gulp.task('copy', function () {
  return gulp.src('dev/*.html')
    .pipe(plumber(plumberErrorHandler))
    .pipe(gulp.dest('docs/'));
});

gulp.task('cname', function () {
  return gulp.src('dev/CNAME')
    .pipe(plumber(plumberErrorHandler))
    .pipe(gulp.dest('docs/'));
});

gulp.task('imagecopy', function () {
  return gulp.src('dev/images/*')
    .pipe(plumber(plumberErrorHandler))
    .pipe(gulp.dest('docs/assets'));
});

gulp.task('sass', function () {
  return gulp.src('dev/css/styles.scss')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass({ outputStyle: 'compressed', errLogToConsole: true}))
    .pipe(postcss([autoprefixer({ browsers: ['> 2.5% in US', 'ie >= 10', 'Android >= 4.3', 'iOS >= 7']})]))
    .pipe(gulp.dest('docs/assets'));
});

gulp.task('scripts', function () {
  return gulp.src('dev/scripts/*.js')
    .pipe(plumber(plumberErrorHandler))
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('docs/assets'));
});

gulp.task('build', function (callback) {
  runsequence('clean', ['cname','copy','imagecopy','sass', 'scripts'], callback);
});

gulp.task('watch', ['build'], function () {
  gulp.watch(['dev/css/**/*.scss'], ['sass']);
  gulp.watch(['dev/scripts/*.js'],['scripts']);
  gulp.watch(['dev/images/**'],['imagecopy']);
  gulp.watch(['dev/*.html'], ['copy']);
});

gulp.task('default', function (callback) {
    runsequence(['build', 'watch'], callback);
});
