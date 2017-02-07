"use strict";

var gulp = require("gulp");
var watch = require("gulp-watch");
var browserSync = require("browser-sync");
var reload = browserSync.reload;

var config = {
    server: {
        baseDir: "./"
    },
    tunnel: "tticttacttoe",
    host: "localhost",
    port: 30008,
    logPrefix: "tictactoe"
};

// server
gulp.task("server", function () {
    browserSync(config);
});

// html
gulp.task("html", function () {
    return gulp.src("./index.html")
        .pipe(reload({ stream: true }));
});

// css
gulp.task("css", function () {
    return gulp.src("./css/**/*.css")
        .pipe(reload({ stream: true }));
});

// js
gulp.task("js", function () {
    return gulp.src("./js/**/*.js")
        .pipe(reload({ stream: true }));
});

// watch
gulp.task("watch", function () {
    watch(["./index.html"], function (event, cb) {
        gulp.start("html");
    });
    watch(["./css/**/*.css"], function (event, cb) {
        gulp.start("css");
    });
    watch(["./js/**/*.js"], function (event, cb) {
        gulp.start("js");
    });
});

gulp.task("default", ["server", "watch"]);
