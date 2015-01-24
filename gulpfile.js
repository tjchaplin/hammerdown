var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('default', ['lint','test']);

gulp.task('watch', function() {
    gulp.watch(['test/**', 'lib/**'], ["lint"])
});

gulp.task('lint', function() {
  gulp.src(['./lib/**/*.js',
            './test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test',["lint","unitTest","bddTest"]);

gulp.task('unitTest',function(){
    gulp.src(['test/unit/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('bddTest',function(){
    gulp.src(['test/spec/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('test:local',['lint'],function(){
    gulp.src(['test/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});