var gulp = require('gulp');

gulp.task('build', ['sass', 'copy', 'config', 'vendor', 'fonts', 'webpack:prod']);
