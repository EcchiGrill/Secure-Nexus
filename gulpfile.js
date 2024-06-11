var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var sass = require( 'gulp-sass' )(require ('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create()

var styleSRC = 'src/scss/style.scss';
var styleDIST = './dist/css/';
var styleWatch = 'src/scss/*.scss';
var htmlWatch = '*.html';
// var imgSRC ='src/img/*'
// var imgDIST ='dist/img/'

gulp.task('style', function() {
    return gulp.src(styleSRC)
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(styleDIST));
}); 

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        chrome: '-browser "chrome.exe"',
        notify: false
    })
});

gulp.task('watch', gulp.parallel('browser-sync', function(done) {
        gulp.watch(styleWatch, gulp.series('style'));
        gulp.watch(htmlWatch, browserSync.reload);
        done();
    }));


gulp.task('default', gulp.series('watch'));
