const gulp = require('gulp');
const sass = require('gulp-sass');
const sassglob = require('gulp-sass-glob');
const uglify = require('gulp-uglify'); // JS uglify
const pump = require('pump'); // JS error handling
const concat = require('gulp-concat'); // Concatinate JS
const run = require('gulp-run-command').default;
const kss = require('kss')
const gulpif = require('gulp-if')
const imagemin = require('gulp-imagemin')

const onError = (err) => {
    console.log(err);
};

// -------------------------------------------------------------------------- //
// GULP CONFIG
// -------------------------------------------------------------------------- //

var WP = false // If the project is a Wordpress site, set to true.
var PROJECT_NAME = '' // If WP is true this should be the theme name.

var HTML_ROOT = './styleguide'
var WP_ROOT = '../../../styleguide'
var THEME_ROOT = '../wp-content/themes/' + PROJECT_NAME + '/assets' // Only set if WP is true

// -------------------------------------------------------------------------- //
// KSS
// -------------------------------------------------------------------------- //

// Build CSS for the styleguide builder
gulp.task('kss-builder', function () {
  return gulp.src('./kss-builder/kss-assets/stylesheets/*.sass')
    .pipe(sassglob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./kss-builder/kss-assets/stylesheets/'));
});

// Build the styleguide for the project
gulp.task('styleguide', () =>
    kss({
        source: 'ui/stylesheets',
        destination: gulpif(WP, WP_ROOT, HTML_ROOT),
        homepage: '../../kss-builder/homepage.md',
        builder: 'kss-builder',
        css: gulpif(WP, THEME_ROOT + '/css/application.css', '../assets/css/application.css'),
        js: gulpif(WP, THEME_ROOT + '/js/application.js', '../assets/js/application.js'),
        title: 'Styleguide'
    })
)

// -------------------------------------------------------------------------- //
// SASS
// -------------------------------------------------------------------------- //

gulp.task('sass', function () {
  return gulp.src('./ui/stylesheets/*.sass')
    .pipe(sassglob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

// -------------------------------------------------------------------------- //
// JS
// -------------------------------------------------------------------------- //

gulp.task('js', function (cb) {
  pump([
        gulp.src('./ui/javascripts/*.js'),
        concat('application.js'),
        uglify(),
        gulp.dest('./assets/js')
    ],
    cb
  );
});

// -------------------------------------------------------------------------- //
// IMAGES
// -------------------------------------------------------------------------- //

gulp.task('images', () =>
    gulp.src('./ui/images/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 10})
        ]))
        .pipe(gulp.dest('./assets/img'))
);

// -------------------------------------------------------------------------- //
// WATCH
// -------------------------------------------------------------------------- //

gulp.task('watch', function () {
    gulp.watch('./ui/stylesheets/**/*.sass', ['sass', 'styleguide']);
    gulp.watch('./ui/stylesheets/**/*.hbs', ['styleguide']);
    gulp.watch('./ui/javascripts/**/*.js', ['js']);
});

// -------------------------------------------------------------------------- //
// BUILD TASKS
// -------------------------------------------------------------------------- //

gulp.task('default', ['sass', 'js', 'images', 'styleguide', 'watch']);
gulp.task('build', ['sass', 'js', 'images', 'styleguide']);
