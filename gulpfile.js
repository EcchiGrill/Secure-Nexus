var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var print = require( 'gulp-print' );

var styleSRC = './src/scss/style.css';
var styleDIST = './dist/css/';

gulp.task('style', function(done) {
    gulp.src(styleSRC)
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(styleDIST))
    done();
}); 