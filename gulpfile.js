var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', ['lint','test']);

gulp.task('watch', function() {
    gulp.watch(['test/**', 'lib/**'], ["lint"])
});

gulp.task('lint', function() {
  return gulp.src(['./lib/**/*.js',
                './test/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter('fail'));
});

gulp.task('unitTest',function(){
    gulp.src(['test/unit/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('bddTest',function(){
    gulp.src(['test/spec/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('test',['lint'],function(){
    return gulp.src(['test/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});

gulp.task('test:local',['lint'],function(){
    gulp.src(['test/**/*.js'])
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});

gulp.task('clean:build',function(cb){
  del(['./dist'], cb);
});

gulp.task('browserify',function(){
    return browserify({standalone:'hammerdown'})
            .add('./index.js')
            .bundle()
            .pipe(source('hammerdown.js'))
            .pipe(gulp.dest('./dist'));
});

gulp.task('build',['test','clean:build','browserify'],function(){
    gulp.src(['./dist/hammerdown.js'])
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/'));
});