const gulp = require('gulp');
const watch = require('gulp-watch');
const gulpShopify = require('gulp-shopify-upload');

const config = require('./config.json');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const neat = require('node-neat').includePaths;
const babel = require('gulp-babel');
const changed = require('gulp-changed');

const watchSrc = {
  js: './dev/scripts/**/*.js',
  css: './dev/css/**/*.{sass,scss}',
  asset: './dev/assets/*.{jpg,jpeg,png,gif,svg,woff,woff2,css,js,scss,pdf}'
};

gulp.task('assets', function(done) {
  let DEST = './docs/assets/';
  gulp.watch(watchSrc.asset).on('all', function(event, path, stats) {
    console.log(`ASSETS: Event ${event}, running tasks...`);
    return gulp.src(watchSrc.asset)
      .pipe(changed(DEST)) // Ignore unchanged files
      //.pipe(imagemin()) // Optimize
      .pipe(gulp.dest(DEST));
  });
  done();
});

gulp.task('styles', function(done) {
  gulp.watch(watchSrc.css).on('all', function(event, path, stats) {
    console.log(`STYLES: Event ${event}, running tasks...`);
    gulp.src(watchSrc.css)
      .pipe(sass({
        includePaths: neat,
        errLogToConsole: true
      }))
      .on('error', function(err) {
        console.log(err.toString());
        this.emit('end');
      })
      .pipe(autoprefixer({
        browsers: ['> 2.5% in US', 'ie >= 10', 'Android >= 4.3', 'iOS >= 7']
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(cssnano())
      .pipe(concat('main.min.css'))
      .pipe(gulp.dest('./docs/assets'))
      .pipe(notify({
        message: 'STYLES: Tasks complete.'
      }));
    done();
  });
});

gulp.task('scripts', function() {
  gulp.watch(watchSrc.js).on('all', function(event, path, stats) {
    console.log(`SCRIPTS: JS event ${event}, running tasks...`);
    return gulp.src(['./dev/scripts/vendor/global.js', './dev/scripts/vendor/!(init)*.js', './dev/scripts/!(vendor)*.js', './dev/scripts/vendor/init.js'])
      .pipe(babel({
        presets: ['env']
      }))
      .on('error', function(err) {
        console.log(err.toString());
        this.emit('end');
      })
      .pipe(concat('main.js'))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(uglify())
      .pipe(gulp.dest('./docs/assets'))
      .pipe(notify({
        message: 'SCRIPTS: JS tasks complete.'
      }));
  });
});

gulp.task('copy', function () {
  gulp.watch('./dev/*.html').on('all', function(event, path, stats) {
  return gulp.src('dev/*.html')
    .pipe(plumber(plumberErrorHandler))
    .pipe(gulp.dest('docs/'));
  });
});

gulp.task('cname', function () {
  gulp.watch('dev/CNAME').on('all', function(event, path, stats) {
  return gulp.src('dev/CNAME')
    .pipe(plumber(plumberErrorHandler))
    .pipe(gulp.dest('docs/'));
  });
});

// Default gulp action when gulp is run
gulp.task('default', gulp.series(gulp.parallel('styles', 'scripts', 'assets', 'copy', 'cname')));
