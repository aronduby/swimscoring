// Include gulp
var gulp = require('gulp');

// Our plugins
var 
	jshint       = require('gulp-jshint'),
	uglify       = require('gulp-uglify'),
	postcss      = require('gulp-postcss'),
	autoprefixer = require('autoprefixer-core'),
	cssmin       = require('gulp-cssmin'),
	del          = require('del'),
	sass         = require('gulp-sass'),
	useref       = require('gulp-useref'),
	gulpif       = require('gulp-if');


// Clean our CSS dist
gulp.task('clean:css', function(cb) {
	del([ 'dist/css/**' ], cb);
});

// Clean our JS dist
gulp.task('clean:js', function(cb) {
	del([ 'dist/js/**' ], cb);
});

// Linter
gulp.task('lint', function(){
	return gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
	// this will automatically include the proper files
	gulp.src('sass/agency.scss')
		.pipe(sass())
		.pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
		.pipe(gulp.dest('css'));
});

// Handle HTML replacement
gulp.task('html', function() {

	var assets = useref.assets();

	gulp.src('index.php')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssmin()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'));


	gulp.src('mail/**/*.*')
		.pipe(gulp.dest('dist/mail'));

	gulp.src('img/**/*.*')
		.pipe(gulp.dest('dist/img'));

	gulp.src('components/font-awesome/fonts/**/*.*')
		.pipe(gulp.dest('dist/fonts'));
});




// Watch files for changes
gulp.task('watch', function() {
	gulp.watch(['sass/**/*.scss'], ['sass']);
});

// Default task
gulp.task('default',['lint', 'sass', 'html', 'watch']);