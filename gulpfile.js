/*!
 * Brixcube Community SDK v1.0
 * Coded by Fauzan Azhiman
 * using Node.js, React + Redux
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
var PUBLIC_ROOT = './src-php/public';
var DEST = './src-php/public/css';      // The build output folder
var DEST_JS = './src-php/public/js'; 
var BUILDER_FOLDER = 'builder';
var CLIENT_FOLDER = 'client';
var INSTALLER_FOLDER = 'installer';

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
gulp.task('clean-css', del.bind(null, [DEST]));
gulp.task('clean-js', del.bind(null, [DEST_JS]));

// Copy fonts
gulp.task('bootstrap-fonts', function () {
  return gulp.src('./node_modules/font-awesome/fonts/*')
      .pipe(gulp.dest(DEST + '/fonts'));
});

//---------------------------------------------------------BUILDER APP CSS------------------------------------------------
gulp.task('builder_styles', function () {
  src.builder_styles = 'src-js/'+BUILDER_FOLDER+'/styles/**/*.{css,less}';
  return gulp.src('src-js/'+BUILDER_FOLDER+'/styles/bootstrap.less')
    .pipe($.plumber())
    .pipe($.less({
      sourceMap: !RELEASE,
      sourceMapBasepath: __dirname
    }))
    .on('error', console.error.bind(console))
    .pipe($.csscomb())
    .pipe($.if(RELEASE, $.minifyCss()))
    .pipe(gulp.dest(DEST + '/'+BUILDER_FOLDER))
    .pipe($.size({title: 'builder_styles'}));
});

//---------------------------------------------------------CLIENT APP CSS------------------------------------------------
gulp.task('client_styles', function () {
    src.client_styles = 'src-js/' + CLIENT_FOLDER + '/styles/**/*.{css,less}';
    return gulp.src('src-js/' + CLIENT_FOLDER + '/styles/bootstrap.less')
      .pipe($.plumber())
      .pipe($.less({
          sourceMap: !RELEASE,
          sourceMapBasepath: __dirname
      }))
      .on('error', console.error.bind(console))
      .pipe($.csscomb())
      .pipe($.if(RELEASE, $.minifyCss()))
      .pipe(gulp.dest(DEST + '/' + CLIENT_FOLDER))
      .pipe($.size({ title: 'client_styles' }));
});

//---------------------------------------------------------INSTALLER APP CSS------------------------------------------------
gulp.task('installer_styles', function () {
  src.installer_styles = 'src-js/'+INSTALLER_FOLDER+'/styles/**/*.{css,less}';
  return gulp.src('src-js/'+INSTALLER_FOLDER+'/styles/bootstrap.less')
    .pipe($.plumber())
    .pipe($.less({
      sourceMap: !RELEASE,
      sourceMapBasepath: __dirname
    }))
    .on('error', console.error.bind(console))
    .pipe($.csscomb())
    .pipe($.if(RELEASE, $.minifyCss()))
    .pipe(gulp.dest(DEST + '/'+INSTALLER_FOLDER))
    .pipe($.size({title: 'installer_styles'}));
});

//---------------------------------------------------------------BUILD WEBPACK BUNDLE----------------------------------------------------------
// Core Bundle
var config = require('./webpack.config.js')(RELEASE);
var bundler = webpack(config);
  
gulp.task('core-bundle', function (cb) {
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

// Extension Bundle
var config2 = require('./webpack.config.extensions.js')(RELEASE);
var bundler2 = webpack(config2);
  
gulp.task('extensions-bundle', function (cb) {
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
    bundler2.watch(200, bundle);
  } else {
    bundler2.run(bundle);
  }
});

//----------------------------------------RUN BUILD!!------------------------------------------------
// Build the app from source code
gulp.task('build', ['clean-css', 'clean-js'], function (cb) {
    runSequence([
      'builder_styles',
      'client_styles',	  
      'installer_styles',
	  'bootstrap-fonts',
      'core-bundle',
      'extensions-bundle'
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
          logPrefix: 'BRIXCUBE',
          // Run as an https by uncommenting 'https: true'
          // Note: this uses an unsigned certificate which on first access
          //       will present a certificate warning in the browser.
          // https: true,
          //server: DEST
          proxy: {
              target: "http://erp.brixcube.info/builder",
              middleware: [
                   webpackHotMiddleware(bundler),
                   webpackHotMiddleware(bundler2),
              ]
          }
      });

    //watch styles
    gulp.watch(src.builder_styles, ['builder_styles']);
    gulp.watch(src.client_styles, ['client_styles']);

    gulp.watch(DEST_JS + '/'+ CLIENT_FOLDER +'/**/*.*', function (file) {
        browserSync.reload(path.relative(__dirname, file.path));
    });
    gulp.watch(DEST_JS + '/' + BUILDER_FOLDER + '/**/*.*', function (file) {
        browserSync.reload(path.relative(__dirname, file.path));
    });
     
    cb();
  });
});
