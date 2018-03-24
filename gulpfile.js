const gulp = require('gulp');
const sass = require('gulp-sass');
const sassglob = require('gulp-sass-glob');
const uglify = require('gulp-uglify'); // JS uglify
const pump = require('pump'); // JS error handling
const concat = require('gulp-concat'); // Concatinate JS

const onError = (err) => {
    console.log(err);
};

gulp.task('sass', function () {
  return gulp.src('./ui/stylesheets/*.sass')
    .pipe(sassglob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('js', function (cb) {
  pump([
        gulp.src('./ui/javascripts/*.js'),
        concat('application.js'),
        uglify(),
        gulp.dest('assets/js')
    ],
    cb
  );
});

gulp.task('sass:watch', function () {
    gulp.watch('./ui/stylesheets/**/*.sass', ['sass']);
});

gulp.task('default', ['sass', 'js', 'sass:watch']);
gulp.task('build', ['sass', 'js']);
