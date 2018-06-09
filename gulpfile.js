/*!
 * ASP.NET MVC Loves React Gulp Configuration
 * Coded by Fauzan Azhiman
 */

'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rename = require("gulp-rename");
var del = require('del');
var path = require('path');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var browserSync = require('browser-sync');

var argv = process.argv.slice(2);

// Settings
var PUBLIC_ROOT = './public/html/';
var DEST_CSS = './public/html/css';      // The build output folder
var DEST_JS = './public/html/js'; 

var RELEASE = false;                 // Minimize and optimize during a build?
console.log(RELEASE ? "Building RELEASE bundles..." : "Building DEVELOPMENT bundles....");

var src = {};
var watch = false;
var pkgs = (function () {
  var temp = {};
  var map = function (source) {
    for (var key in source) {
      temp[key.replace(/[^a-z0-9]/gi, '')] = source[key].substring(1);
    }
  };
  map(require('./package.json').dependencies);
  return temp;
}());

// The default task
gulp.task('default', ['serve']);

// Clean up
gulp.task('clean-css', del.bind(null, [DEST_CSS]));
gulp.task('clean-js', del.bind(null, [DEST_JS]));

// Copy fonts
gulp.task('bootstrap-fonts', function () {
  return gulp.src('./node_modules/font-awesome/fonts/*')
      .pipe(gulp.dest(PUBLIC_ROOT + '/fonts'));
});

//---------------------------------------------------------APP CSS------------------------------------------------
gulp.task('build_styles', function () {
  src.build_styles = 'src/styles/**/*.{css,less}';
  return gulp.src('src/styles/bootstrap.less')
    .pipe($.plumber())
    .pipe($.less({
      sourceMap: !RELEASE,
      sourceMapBasepath: __dirname
    }))
    .on('error', console.error.bind(console))
    .pipe($.csscomb())
    .pipe($.if(RELEASE, $.minifyCss()))
    .pipe(gulp.dest(DEST_CSS + '/'))
    .pipe($.size({title: 'build_styles'}));
});

//---------------------------------------------------------------BUILD WEBPACK BUNDLE----------------------------------------------------------
var config = require('./webpack.config.js')(RELEASE);
var bundler = webpack(config);
  
gulp.task('app-bundle', function (cb) {
  var started = false;
  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    !!argv.verbose && $.util.log('[webpack]', stats.toString({colors: true}));

    if (!started) {
      started = true;
      return cb();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

//----------------------------------------RUN BUILD!!------------------------------------------------
// Build the app from source code
gulp.task('build', ['clean-css', 'clean-js'], function (cb) {
    runSequence([
      'build_styles',
	  'bootstrap-fonts',
      'app-bundle'
      ], cb);
});

//-------------------------------------------------------------LAUNCH HTTP SERVER-----------------------------------------------------------------
var webpackHotMiddleware = require('webpack-hot-middleware');

// Launch a lightweight HTTP Server
gulp.task('serve', function (cb) {

  watch = true;

  runSequence('build', function () {
      browserSync({
          notify: false,
          // Customize the BrowserSync console logging prefix
          logPrefix: 'ASPMVC-LOVES-REACT',
          // Run as an https by uncommenting 'https: true'
          // Note: this uses an unsigned certificate which on first access
          //       will present a certificate warning in the browser.
          // https: true,
          //server: DEST
          proxy: {
              target: "http://asp-loves-react/",
              middleware: [
                   webpackHotMiddleware(bundler)
              ]
          }
      });

    //watch styles
    gulp.watch(src.build_styles, ['build_styles']);

    gulp.watch(DEST_JS + '/**/*.*', function (file) {
        browserSync.reload(path.relative(__dirname, file.path));
    });
     
    cb();
  });
});
