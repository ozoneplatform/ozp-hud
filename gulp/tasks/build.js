var gulp = require('gulp');

gulp.task('build', ['sass', 'copy', 'config', 'vendor', 'fonts', 'svg', 'webpack:prod']);
