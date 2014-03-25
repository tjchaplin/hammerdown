var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('default', ['lint','test']);

gulp.task('watch', function() {
    gulp.watch(['test/**', 'lib/**'], ["lint"])
});

gulp.task('catchErrorTest',function(){
    gulp.src(['test/**/*.js'])
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('lint', function() {
  gulp.src(['./lib/**/*.js',
            './test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test',["unitTest","integrationTest"]);

gulp.task('unitTest',function(){
    gulp.src(['test/unit/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});

gulp.task('integrationTest',function(){
    gulp.src(['test/integration/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
})