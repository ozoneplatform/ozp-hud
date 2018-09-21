var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require("webpack");
var webpackConfig = require("../../webpack.config.js");
var WebpackDevServer = require('webpack-dev-server');

gulp.task('dev', ['sass', 'copy', 'config', 'vendor', 'images', 'fonts', 'svg', 'jqueryUndupe'], function () {
    var devConfig = Object.create(webpackConfig);
    devConfig.devtool = "eval";
    devConfig.debug = true;

    // Start a webpack-dev-server
    var server = new WebpackDevServer(webpack(devConfig), {
        publicPath: "/" + devConfig.output.publicPath,
        stats: {
            colors: true
        }
    });

    server.listen(8088, "0.0.0.0", function (err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://0.0.0.0:8088/dist");
    });

    // refresh app on sass, images and html changes
    gulp.watch(['app/styles/**/*'], ['sass', reloadApp]);
    gulp.watch(['app/images/**/*', 'app/index.html'], ['copy', reloadApp]);

    // refersh app manually
    function reloadApp () {
        server.io.sockets.emit('ok');
    }
});
