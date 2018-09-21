var gulp = require('gulp');

gulp.task('build', ['images', 'sass', 'copy', 'config', 'vendor', 'fonts', 'svg',
  'jqueryUndupe', 'webpack:prod']);
