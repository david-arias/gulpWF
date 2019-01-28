var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

sass.compiler = require('node-sass');

gulp.task('default', function() {
     return new Promise( function(resolve, reject){
          console.log('Hola GULP!!');
          resolve();
     } )
});

gulp.task('sass', function() {
     return gulp.src('./scss/**/*.scss')
          .pipe(plumber({ errorHandler: function(err) {
               notify.onError({
                    title: "[ERROR] " + err.code,
                    message:  err.plugin + "| Error in line: " + err.line +":"+ err.column + "  Check your terminal / prompt",
               })(err);
               console.log( err.message );
          }}))
          .pipe(autoprefixer({
               browsers: ['last 5 versions'],
               cascade: false
          }))
          // .pipe(cssnano())
          .pipe(gulp.dest('app/css'))
})