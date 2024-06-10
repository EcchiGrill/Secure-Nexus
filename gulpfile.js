var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var sass = require( 'gulp-sass' )(require ('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');

var styleSRC = 'src/scss/style.scss';
var styleDIST = './dist/css/';
var styleWatch = 'src/scss/*.scss'
var imgSRC ='src/images/*.img'
var imgDIST ='dist/images/'

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

gulp.task('image', function() {
    return gulp.src(imgSRC)
      .pipe(imagemin())
      .pipe(gulp.dest(imgDIST));
  });

gulp.task('default', gulp.series('style', 'image'));

gulp.task('watch', function(){
    gulp.watch(styleWatch, gulp.series('style'));
    gulp.watch(imgSRC, gulp.series('image'));
});
