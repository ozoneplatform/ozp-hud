var gulp  = require('gulp');
var shell = require('gulp-shell');
var pjson = require('../../package.json');

var build_dir = 'dist';

gulp.task('tarDistVersion', shell.task([
   './packageRelease.sh hud-prod dist ' + pjson.version + '',
]));
