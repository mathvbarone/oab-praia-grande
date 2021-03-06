//REQUIRES
var gulp = require('gulp')
  , autoprefixer = require('gulp-autoprefixer')
  , sass = require('gulp-sass')
  , imagemin = require('gulp-imagemin')
  , beautifycss = require('gulp-cssbeautify')
  , uglifycss = require('gulp-uglifycss')
  , uglifyjs = require('gulp-uglify')
  , htmlclean = require('gulp-htmlclean')
  , replace = require('gulp-replace')
  , gulpif = require('gulp-if')
  , rename = require('gulp-rename');

//PATHS FILES
var paths = {
	src : {
	  html 	: 	'src/html/**/*',
		sass 	: 	'src/scss/**/*.scss',
		js 		: 	'src/js/**/*.js',
		img		: 	'src/images/**/*'
	} ,
	dest : {
	  html 	: 	'../',
		sass 	: 	'dist/css',
		js 		: 	'dist/js',
		img		: 	'dist/images',
		beauty : {
		  sass  : 'dist/css/beauty'
		}
	}
}

//TASKS
gulp.task('imagemin', function(){
  gulp.src( paths.src.img )
    .pipe(imagemin())
    .pipe(gulp.dest( paths.dest.img ));
});

gulp.task('html', function(){
  gulp.src( paths.src.html )
    .pipe(htmlclean())
    .pipe(gulp.dest( paths.dest.html ));
});

gulp.task('css', function(){
  gulp.src( paths.src.sass )
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(uglifycss())
    .pipe(rename(function(file){
      file.extname = ".min.css"
    }))
    .pipe(gulp.dest( paths.dest.sass ))
    .pipe(beautifycss())
    .pipe(rename(function(file){
      file.basename = file.basename.replace('min', 'beauty')
    }))
    .pipe(gulp.dest( paths.dest.beauty.sass ));
});

gulp.task('js', function(){
  gulp.src( paths.src.js )
    .pipe(uglifyjs())
    .pipe(rename(function(file){
      file.extname = ".min.js"
    }))
    .pipe(gulp.dest( paths.dest.js ));
});

//WATCH
gulp.task('watch', function(){
  gulp.watch(paths.src.html, ['html']);
  gulp.watch(paths.src.sass, ['css']);
  gulp.watch(paths.src.js, ['js']);
  gulp.watch(paths.src.img, ['imagemin']);
});

gulp.task('default', ['html', 'css', 'js' ,'imagemin', 'watch']);
