var input = 'app/scss/**/*.scss';
var output = 'app/css/';

var gulp = require('gulp');

// require gulp plugins
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function(){

	return gulp.src(input)
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest(output))
	.pipe(browserSync.reload({
		stream: true
	}))

});

gulp.task('watch',['browserSync'],function(){
	gulp.watch(input,['sass']);	
});

gulp.task('browserSync',function(){
	browserSync.init({
		server: {

			baseDir: 'app'
		}
	});
});

gulp.task('minificar-css',function(){
	return gulp.src(output + '*.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/dist/'));
});

gulp.task('default',['watch']);