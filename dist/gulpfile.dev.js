"use strict";

var gulp = require("gulp");

var ts = require('gulp-typescript');

var browserify = require("browserify");

var source = require("vinyl-source-stream");

var watchify = require("watchify");

var tsify = require("tsify");

var fancy_log = require("fancy-log");

var paths = {
  pages: ["src/*.html"]
};
var watchedBrowserify = watchify(browserify({
  basedir: ".",
  debug: true,
  entries: ["src/main.ts"],
  cache: {},
  packageCache: {}
}).plugin(tsify));
gulp.task('default', function () {
  return gulp.src('src/**/*.ts').pipe(ts({
    noImplicitAny: true,
    outFile: 'index.js',
    declaration: true
  })).pipe(gulp.dest('dist'));
});
gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
}); // gulp.task("copy-data", function () {
//   return gulp.src(paths.data).pipe(gulp.dest("dist"));
// });

function bundle() {
  return watchedBrowserify.bundle().on("error", fancy_log).pipe(source("bundle.js")).pipe(gulp.dest("dist"));
}

gulp.task("default", gulp.series(gulp.parallel("copy-html"), bundle));
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancy_log);