// requires
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var browserSync = require('browser-sync').create();
var connect = require('gulp-connect-php');

// code
sass.compiler = require('node-sass');

gulp.task('default', function() {
     return new Promise( function(resolve, reject){
          console.log('Hola GULP!!');
          resolve();
     } )
});

// SERVE task
gulp.task('serve', function() {
     connect.server({}, function (){
		browserSync.init({
			proxy: '127.0.0.1:8000/app/',
			port: 8910
		});
     });
     
     // sass watch
     gulp.watch("scss/**/*.scss", gulp.series('sass'));
     console.log('Watch SASS changes');

     // html watch
     gulp.watch("app/*.html").on('change', browserSync.reload);
     console.log('Watch HTML changes');
     
     // html watch
     gulp.watch("app/*.php").on('change', browserSync.reload);
     console.log('Watch PHP changes');
     
})

// SASS task
gulp.task('sass', function() {
     return gulp.src('./scss/*.scss')
          .pipe(plumber({ errorHandler: function(err) {
               notify.onError({
                    title: "[ERROR] " + err.code,
                    message:  err.plugin + "| Error in line: " + err.line +":"+ err.column + "  Check your terminal / prompt",
               })(err);
               console.log( err.message );
          }}))
          .pipe(sass({
               /* output style : nested | compact | expanded | compressed */
               // outputStyle: 'expanded'
          }))
          .pipe(autoprefixer({
               browsers: ['last 5 versions'],
               cascade: false
          }))
          .pipe(cssnano())
          .pipe(gulp.dest('app/css'))
          .pipe(browserSync.stream());
})