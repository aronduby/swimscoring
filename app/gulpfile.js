// Include gulp
var gulp = require('gulp');

// Our plugins
var jshint         = require('gulp-jshint'),
	concat         = require('gulp-concat'),
	uglify         = require('gulp-uglify'),
	rename         = require('gulp-rename'),
	sourcemaps     = require('gulp-sourcemaps'),
	postcss        = require('gulp-postcss'),
	autoprefixer   = require('autoprefixer-core'),
	cssmin         = require('gulp-cssmin'),
	del            = require('del'),
	mainBowerFiles = require('main-bower-files'),
	filter         = require('gulp-filter'),
	order          = require('gulp-order'),
	es             = require('event-stream'),
	htmlreplace    = require('gulp-html-replace'),
	templateCache  = require('gulp-angular-templatecache'),
	cssUrlAdjuster = require('gulp-css-url-adjuster');


// Clean our CSS dist
gulp.task('clean:css', function(cb) {
	del([ 'dist/css/**' ], cb);
});

// Clean our JS dist
gulp.task('clean:js', function(cb) {
	del([ 'dist/js/**' ], cb);
});

// CSS 
gulp.task('styles', ['clean:css'], function() {

	var styles = gulp.src('src/css/**/!(app)*.css')
		.pipe(concat('styles.css'))
		.pipe(cssUrlAdjuster({
			replace: ['../fonts', 'fonts']
		}));

	var component_styles = gulp.src(mainBowerFiles())
		.pipe(filter('*.css'))
		.pipe(concat('components.css'));

	var app = gulp.src('src/css/app.css')
		.pipe(concat('app.css'));

	es.concat(styles, component_styles, app)
		.pipe(order([
			'styles.css',
			'components.css',
			'app.css'
		]))
		.pipe(sourcemaps.init())
			.pipe(concat('app.min.css'))
			.pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
			.pipe(cssmin())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'));

	gulp.src('src/css/fonts/**/*.*')
		.pipe(gulp.dest('dist/css/fonts'));
});

// Linter
gulp.task('lint', function(){
	return gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Concat & Minify JS
gulp.task('scripts', ['clean:js'], function(){

	var scripts = ['src/js/!(sharer)*.js'];

	gulp.src(mainBowerFiles().concat(scripts))
		.pipe(filter('*.js'))
		.pipe(sourcemaps.init())
			.pipe(concat('app.min.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/js'));

	gulp.src('src/js/sharer.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// Handle HTML replacement
gulp.task('html', function() {

	gulp.src('src/partials/**/*.html')
		.pipe(templateCache('templates.js', {
			root: 'partials/',
			module: 'myApp'
		}))
		.pipe(gulp.dest('dist/js'));

	gulp.src('src/index.html')
		.pipe(htmlreplace({
			'js': ['js/app.min.js', 'js/templates.js'],
			'css': 'css/app.min.css'
		}))
		.pipe(gulp.dest('dist'));

	gulp.src('src/layout_imgs/**/*.*')
	  .pipe(gulp.dest('dist/layout_imgs'))
});


// Clean our cordova CSS dist
gulp.task('clean:cordova:css', function(cb) {
	del([ 'cordova/www/css/**' ], cb);
});

// Clean our cordova JS dist
gulp.task('clean:cordova:js', function(cb) {
	del([ 'cordova/www/js/**' ], cb);
});

gulp.task('cordova',['lint', 'clean:cordova:css', 'clean:cordova:js'], function() {
    
	// make our styles
	var styles = gulp.src('src/css/**/!(app)*.css')
		.pipe(concat('styles.css'))
		.pipe(cssUrlAdjuster({
			replace: ['../fonts', 'fonts']
		}));

	var component_styles = gulp.src(mainBowerFiles())
		.pipe(filter('*.css'))
		.pipe(concat('components.css'));

	var app = gulp.src('src/css/app.css')
		.pipe(concat('app.css'));

	es.concat(styles, component_styles, app)
		.pipe(order([
			'styles.css',
			'components.css',
			'app.css'
		]))
		.pipe(concat('app.min.css'))
		.pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
		.pipe(cssmin())
		.pipe(gulp.dest('cordova/www/css'));

	gulp.src('src/css/fonts/**/*.*')
		.pipe(gulp.dest('cordova/www/css/fonts'));


	// handle scripts
	var scripts = ['src/js/!(sharer)*.js'];
	gulp.src(mainBowerFiles().concat(scripts))
		.pipe(filter('*.js'))
		.pipe(sourcemaps.init())
			.pipe(concat('app.min.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('cordova/www/js'));

	gulp.src('src/js/sharer-cordova.js')
		.pipe(uglify())
		.pipe(rename({
			basename: 'sharer'
		}))
		.pipe(gulp.dest('cordova/www/js'));

	// add our browser share to the merge directory
	gulp.src('src/js/sharer.js')
		.pipe(uglify())
		.pipe(gulp.dest('cordova/merges/browser/js'));


	// finally the html
	gulp.src('src/partials/**/*.html')
		.pipe(templateCache('templates.js', {
			root: 'partials/',
			module: 'myApp'
		}))
		.pipe(gulp.dest('cordova/www/js'));

	gulp.src('src/index.html')
		.pipe(htmlreplace({
			'js': ['js/app.min.js', 'js/templates.js'],
			'css': 'css/app.min.css',
			'cordova': 'cordova.js'
		}))
		.pipe(gulp.dest('cordova/www'));

	gulp.src('src/layout_imgs/**/*.*')
	  .pipe(gulp.dest('cordova/www/layout_imgs'))

});



// Watch files for changes
gulp.task('watch', function() {
	gulp.watch(['js/*.js', 'css/**/*.css'], ['lint', 'scripts', 'styles']);
});

// Default task
gulp.task('default',['lint','scripts', 'styles', 'html']);